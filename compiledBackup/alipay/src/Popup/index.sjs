function getContentStyle(position, animation, duration, width, height) {
  var style = '';
  if (animation) {
    style += "-webkit-animation-duration:".concat(duration, "ms; animation-duration:").concat(duration, "ms;");
  }
  if (position === 'top' || position === 'bottom') {
    if (typeof height !== 'undefined' && height !== null) {
      style += "height:".concat(height, "px");
    }
  }
  if (position === 'left' || position === 'right') {
    if (typeof width !== 'undefined' && width !== null) {
      style += "width:".concat(width, "px");
    }
  }
  return style;
}
export default {
  getContentStyle: getContentStyle
};