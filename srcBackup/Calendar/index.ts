import dayjs from 'dayjs';
import equal from 'fast-deep-equal';
import { Component, triggerEvent, getValueFromProps } from '../_util/simply';
import {
  CalendarValue,
  CellState,
  defaultLocaleText,
  CalendarDefaultProps,
} from './props';
import {
  getMonthListFromRange,
  getSelectionModeFromValue,
  renderCells,
  getScrollIntoViewId,
} from './utils';
import mixinValue from '../mixins/value';
import { getInstanceBoundingClientRect } from '../_util/jsapi/get-instance-bounding-client-rect';

Component(
  CalendarDefaultProps,
  {
    getInstance() {
      if (this.$id) {
        return my;
      }
      return this;
    },
    async getBoundingClientRect(query: string) {
      return await getInstanceBoundingClientRect(this.getInstance(), query);
    },
    scrollIntoView(value) {
      this.updateScrollIntoViewId(getScrollIntoViewId(value));
    },
    clickCell(e) {
      const time = e.currentTarget.dataset.time;
      const clickDate = dayjs(time.time);
      if (time.disabled) {
        return;
      }
      const value = this.getValue();
      const selectionModeFromValue = getSelectionModeFromValue(value);
      const selectionMode =
        getValueFromProps(this, 'selectionMode') ??
        selectionModeFromValue ??
        'range';
      if (selectionMode === 'range') {
        if (Array.isArray(value)) {
          if (value.length === 1) {
            const current = value[0];
            if (dayjs(clickDate.toDate().getTime()).isBefore(dayjs(current))) {
              this.updateValue([clickDate.toDate().getTime()]);
            } else {
              this.updateValue([value[0], clickDate.toDate().getTime()]);
            }
          } else {
            this.updateValue([clickDate.toDate().getTime()]);
          }
        } else {
          this.updateValue([clickDate.toDate().getTime()]);
        }
      } else if (selectionMode === 'single') {
        this.updateValue(clickDate.toDate().getTime());
      }
    },
    setCurrentMonth(e) {
      this.setData({ headerState: e.month });
    },
    measurement() {
      const { elementSize } = this.data;
      // 组件如果内嵌在 slot 里, 一定会被渲染出来, 但是此时 cellHight 为 0
      // 此时需要重新计算
      if (!elementSize || elementSize.cellHight === 0) {
        this.measurementFn();
      }
    },
    measurementFn() {
      Promise.all([
        this.getBoundingClientRect('.ant-calendar-body-container'),
        this.getBoundingClientRect('.ant-calendar-cells'),
        this.getBoundingClientRect('.ant-calendar-title-container'),
      ])
        .then(([bodyContainer, cellContainer, Title]) => {
          // 滚动的时候 top 和 bottom 等尺寸会变
          // 所以只能依赖 height 来计算
          const paddingHeight =
            bodyContainer.height - cellContainer.height - Title.height;
          const monthTitleHeight = Title.height + paddingHeight;
          const cellHight =
            cellContainer.height / (this.data.monthList[0].cells.length / 7);
          this.setData({
            elementSize: {
              monthTitleHeight,
              cellHight,
              paddingHeight,
            },
          });
        })
        .catch(() => {
          this.setData({ elementSize: null });
        });
    },

    // scroll 触发滚动之后需要重置 scrollIntoViewId
    updateScrollIntoViewId(id) {
      this.setData({ scrollIntoViewId: id });
      const timer = setTimeout(() => {
        this.setData({ scrollIntoViewId: '' });
        clearTimeout(timer);
      });
    },

    updateValue(newValue: CalendarValue) {
      triggerEvent(this, 'change', newValue);
      if (!this.isControlled()) {
        this.update(newValue);
      }
    },
    updateData() {
      const [
        monthRange,
        plocaleText,
        pweekStartsOn,
        onFormatter,
        onMonthFormatter,
      ] = getValueFromProps(this, [
        'monthRange',
        'localeText',
        'weekStartsOn',
        'onFormatter',
        'onMonthFormatter',
      ]);
      const localeText = Object.assign({}, defaultLocaleText, plocaleText);
      const markItems = [...localeText.weekdayNames];
      const weekStartsOn = pweekStartsOn;
      if (weekStartsOn === 'Sunday') {
        const item = markItems.pop();
        if (item) markItems.unshift(item);
      }
      const value = this.getValue();
      const monthList = getMonthListFromRange(
        dayjs(monthRange?.[0]),
        dayjs(monthRange?.[1])
      ).map((p) => {
        let cells = renderCells(p, weekStartsOn, value, localeText);
        if (onFormatter && typeof onFormatter === 'function') {
          cells = cells.map((o): CellState => {
            const {
              time,
              top,
              bottom,
              disabled,
              isSelectedBegin,
              isSelectedEnd,
              isSelected,
              className,
            } = o;
            const newState =
              onFormatter(
                {
                  time,
                  top: top ? { ...top } : undefined,
                  bottom: bottom ? { ...bottom } : undefined,
                  disabled,
                  isSelectedBegin,
                  isSelectedEnd,
                  isSelected,
                  className,
                },
                value
              ) ?? {};
            const result = { ...o };
            if (typeof newState === 'object') {
              // 只允许修改的字段字段
              ['top', 'bottom', 'disabled', 'className'].forEach((key) => {
                if (key in newState) {
                  result[key] = newState[key];
                }
              });
            }
            return result;
          });
        }
        let month = {
          title: p.format(localeText.title),
          className: '',
          cells,
        };
        if (onMonthFormatter && typeof onMonthFormatter === 'function') {
          month = { ...month, ...onMonthFormatter(p) };
        }
        return month;
      });
      this.setData({ markItems, monthList });
    },
  },
  {
    elementSize: null,
    markItems: [],
    monthList: [],
    headerState: 0,
    scrollIntoViewId: '',
  },
  [mixinValue()],
  {
    didMount() {
      this.updateData();
      this.measurementFn();
      // 初始化默认值时，滚动到选中位置
      const [value, defaultValue] = getValueFromProps(this, [
        'value',
        'defaultValue',
      ]);
      if (this.isControlled()) {
        this.updateScrollIntoViewId(getScrollIntoViewId(value));
      } else {
        defaultValue &&
          this.updateScrollIntoViewId(getScrollIntoViewId(defaultValue));
      }
    },
    didUpdate(prevProps, prevData) {
      if (!this.isEqualValue(prevData)) {
        // 滚动到已选的位置
        const changedScrollIntoView = getValueFromProps(
          this,
          'changedScrollIntoView'
        );
        changedScrollIntoView &&
          this.updateScrollIntoViewId(getScrollIntoViewId(this.getValue()));
      }
      if (!equal(prevProps, this.props) || !this.isEqualValue(prevData)) {
        this.updateData();
      }
    },
    /// #if WECHAT
    attached() {
      this.updateData();
      this.measurementFn();
      // 初始化默认值时，滚动到选中位置
      const [value, defaultValue] = getValueFromProps(this, [
        'value',
        'defaultValue',
      ]);
      if (this.isControlled()) {
        this.updateScrollIntoViewId(getScrollIntoViewId(value));
      } else {
        defaultValue &&
          this.updateScrollIntoViewId(getScrollIntoViewId(defaultValue));
      }
      this.triggerEvent('ref', this);
    },

    observers: {
      '**': function (data) {
        const prevData = this._prevData || this.data;
        this._prevData = { ...data };
        if (!equal(prevData, data)) {
          this.updateData();
        }
      },
      'mixin.value': function () {
        // 滚动到已选的位置
        const changedScrollIntoView = getValueFromProps(
          this,
          'changedScrollIntoView'
        );
        changedScrollIntoView &&
          this.updateScrollIntoViewId(getScrollIntoViewId(this.getValue()));
      },
    },
    /// #endif
  }
);
