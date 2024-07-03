Page({
  data: {
    value: '',
    visible: false,
    visible2: false,
    visible3: false,
  },
  onInputChange(value) {
    /// #if WECHAT
    value = value.detail;
    /// #endif
    this.setData({ value });
  },
  // 默认键盘
  onTap() {
    this.setData({ visible: true });
  },
  // 关闭键盘
  onClose() {
    this.setData({ visible: false });
  },
  // 不带蒙层
  onTap2() {
    this.setData({ visible2: true });
  },
  onClose2() {
    this.setData({ visible2: false });
  },
  // 监听各种事件
  onTap3() {
    this.setData({ visible3: true });
  },
  onClose3() {
    this.setData({ visible3: false });
  },
  onChange(value) {
    /// #if WECHAT
    value = value.detail;
    /// #endif
    const curValue = this.data.value;
    this.setData({ value: curValue + value });
  },
  onKeyBoardError(err) {
    /// #if WECHAT
    err = err.detail;
    /// #endif
    my.showToast({ content: 'onError ' + err.toString() });
  },
});
