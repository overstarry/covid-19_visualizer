

/**
 * 时间戳转时间字符串
 * @param time
 * @returns {string}
 */
export function time(time = +new Date()) {
  var date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.');
}
