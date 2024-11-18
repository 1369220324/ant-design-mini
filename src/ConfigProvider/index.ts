import { effect } from '@preact/signals-core';
import equal from 'fast-deep-equal';
import kebabCase from 'lodash.kebabcase';
import {
  ComponentWithSignalStoreImpl,
  getValueFromProps,
} from '../_util/simply';
import i18nController from '../_util/store';
import { cssVariables } from './darkTheme';
import { ConfigProviderDefaultProps } from './props';

ComponentWithSignalStoreImpl(
  {
    store: () => i18nController,
    updateHook: effect,
    mapState: {
      locale: ({ store }) => store.currentLocale.value,
      theme: ({ store }) => store.currentTheme.value,
    },
  },
  ConfigProviderDefaultProps,
  {
    update() {
      const [theme, themeVars, locale] = getValueFromProps(this, [
        'theme',
        'themeVars',
        'locale',
      ]);
      // 初始化读取locale并更新store数据
      i18nController.switchLocale(locale);
      // 如果设置了主题，则切换主题，覆写themeVars
      if (theme) {
        i18nController.switchTheme(theme);
      }
      this.convertThemeVarsToCSSVars(themeVars);
    },
    /**
     * 主题生成 css vars
     * 如果写死深色主题，则覆盖掉原来的颜色
     * @param themeVars
     * @returns
     */
    convertThemeVarsToCSSVars(themeVars: Record<string, string | number>) {
      let cssVars = '';
      let copyThemeVars = {};
      if (this.data.theme === 'dark') {
        copyThemeVars = { ...cssVariables, ...themeVars };
      }
      if (this.data.theme === 'light') {
        copyThemeVars = { ...themeVars };
      }
      Object.keys(copyThemeVars).forEach((key) => {
        cssVars = `${cssVars}--${kebabCase(key)}: ${copyThemeVars[key]};`;
      });
      this.setData({
        cssVarStyle: cssVars,
      });
    },
  },
  {
    cssVarStyle: '',
  },
  [],
  {
    /// #if ALIPAY
    onInit() {
      this.update();
    },
    didUpdate(prevProps) {
      if (!equal(prevProps, getValueFromProps(this))) {
        this.update();
      }
    },
    /// #endif
    /// #if WECHAT
    attached() {
      this.update();
    },
    observers: {
      '**': function (data) {
        const prevData = this._prevData || this.data;
        this._prevData = { ...data };
        if (!equal(prevData, prevData)) {
          this.update();
        }
      },
    },
    /// #endif
  }
);
