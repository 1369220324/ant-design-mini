import equal from 'fast-deep-equal';
import debounce from '../_util/debounce';
import { BladeViewDefaultProps } from './props';

/** 
 * 每个sideBarItem的高度
 */
const DEVIATION = 8;

Component({
  props: BladeViewDefaultProps,
  data: {
    currentKey: '',
    scrollTop: 0,
    value: undefined,
    isTouchingSideBar: false
  },

  didMount() {
    const { defaultValue } = this.props;
    this.computeTopRange(defaultValue);
    this.computeSideBar();

    if (defaultValue) {
      this.setData({
        value: defaultValue
      })
    }

    this.debounce = debounce((func, ...rest) => {
      func.call(this, ...rest);
    }, 50);
  },

  didUpdate(prevProps) {
    /** 
     * 数据源变化时需要重新计算高度
     */
    if (!equal(prevProps.data, this.props.data)) {
      this.computeTopRange();
      this.computeSideBar();
    }
    if (!equal(prevProps.value, this.props.value)) {
      this.setData({
        value: this.props.value
      })
    }
  },

  methods: {
    /** 
     * 渲染后计算每个group距离容器顶部的top值，并设置currentKey
     */
    computeTopRange(curVal) {
      (my.createSelectorQuery as any)()
        .selectAll('.amd-blade-view-body-group')
        .boundingClientRect()
        .exec((res) => {
          if (res[0] === null) throw new Error('找不到元素');
          this.topRange = res[0].reduce((pre, cur) => {
            pre.push({
              id: cur.id || `amd-blade-view-group-${cur.dataset.key}`,
              key: cur.dataset.key,
              height: cur.height,
              top: cur.height + (pre && pre[`${pre.length - 1}`] && pre[`${pre.length - 1}`].top || 0),
            });
            return pre;
          }, []);
          /** 
           * 获取当前value到顶部的距离
           */
          this.getCurValNodeToTop(curVal);
        });
    },

    /** 
     * 渲染后找出sidebar中的每个item按钮距离页面上边距的top值
     */
    computeSideBar() {
      (my.createSelectorQuery as any)()
        .selectAll('.amd-blade-view-sidebar-item')
        .boundingClientRect()
        .exec((res) => {
          if (res[0] === null) throw new Error('找不到元素');
          this.sidebarDistance = res[0].map((item) => ({ top: item.top, key: item.dataset.key }));
        });
    },

    setNotScrolling() {
      this.isScrolling = false;
    },

    /** 
     * 滚动监听
     */
    onScroll(e) {
      /** 
       * 判断是否正在滚动
       */
      this.isScrolling = true;
      this.debounce(this.setNotScrolling);
      const { scrollTop } = e.detail;

      /** 
       * 标题和sidebar联动
       */
      const currentKey = this.topRange.find((item) => scrollTop < item.top - DEVIATION).key;

      if (this.data.currentKey === currentKey) return;

      this.setData({
        currentKey
      });
    },

    /** 
     * 找到当前value所处的分组
     */
    onSearchCurValueGroup(curVal) {
      const { data = [] } = this.props;
      for (let i = 0; i < data.length; i++) {
        const groupItem = data[i] || [];
        if (Array.isArray(groupItem.items) && groupItem.items.find(child => child.value === curVal)) {
          return groupItem.key;
        }
      }
    },

    /** 
     * 获取当前value距离顶部的距离
     */
    getCurValNodeToTop(curValue) {
      /** 
       * 获取当前value所处的数据分组
       */
      const curKey = this.onSearchCurValueGroup(curValue);
      (my.createSelectorQuery as any)()
        .selectAll(`#amd-blade-view-group-${curValue}`)
        .boundingClientRect()
        .exec(async (res) => {
          if (res[0] === null) throw new Error('找不到元素');
          const curValToTop = res[0][0].top;

          this.setData({
            currentKey: curKey,
            scrollTop: curValToTop - 300,
          });
        });
    },


    /** 
     * 点击sidebar
     */
    onTapSideItem(e, moveKey) {
      /** 
       * 如果容器正在滚动是不能触发侧边栏点击的，否则会导致逻辑混乱
       */
      if (this.isScrolling) return;

      const key = e && e.target && e.target.dataset && e.target.dataset.key || moveKey;

      if (key === this.data.currentKey) return;

      const findItem = this.topRange.find((item) => item.key === key);
      const scrollTop = findItem.top - findItem.height;

      this.setData({
        currentKey: key,
        scrollTop: scrollTop + Number(this.data.scrollTop === scrollTop),
      });
    },

    onTouchMove(e) {
      const currentY = e.changedTouches[0].pageY;
      const moveOnElement =
        this.sidebarDistance.find((item) => currentY < item.top + DEVIATION) ||
        this.sidebarDistance[this.sidebarDistance.length - 1];

      /** 
       * 触摸到某个节点，就触发点击选中事件（根据 sidebar中的item距离页面顶部距离 和 触摸时手指距离页面顶部距离 来找出触摸到了哪个item）
       */
      this.onTapSideItem(undefined, moveOnElement.key);
    },

    onTouchStart() {
      this.setData({ isTouchingSideBar: true });
    },

    onTouchEnd() {
      this.setData({ isTouchingSideBar: false });
    },

    onTapItem(e) {
      const { item, group } = e.target.dataset;
      const { onChange } = this.props;
      onChange && onChange(item, group);
    },
  },
});