/*!
 * @author xueyangchu
 * @date 2017/5/8
 */
'use strict';

const UA = navigator.userAgent;

/**
 * 判断是否手机
 * @type {boolean}
 */
const isMobile = /iPhone|iPod|iPad|iWatch|Android|Mobile/.test(UA);

let reg = {
  device: {
    android: /([ ;\/)(,]|^)Android([ ;\/)(,]|$)/i,
    iphone: /([ ;\/)(,]|^)iPhone([ ;\/)(,]|$)/i,
    ipad: /([ ;\/)(,]|^)iPad([ ;\/)(,]|$)/i,
    ios: /([ ;\/)(,]|^)IOS([ ;\/)(,]|$)/i,
    windows: /([ ;\/)(,]|^)Windows([ ;\/)(,]|$)/i,
    linux: /([ ;\/)(,]|^)Linux([ ;\/)(,]|$)/i,
    mac: /([ ;\/)(,]|^)(Macintosh|Mac)([ ;\/)(,]|$)/i,
  },
  browser: {
    uc: /([ ;\/)(,]|^)(UCBrowser|UCWEB)([ ;\/)(,]|$)/i,
    safria: /([ ;\/)(,]|^)Safari([ ;\/)(,]|$)/i,
    aol: /([ ;\/)(,]|^)aol([ ;\/)(,]|$)/i,
    arora: /([ ;\/)(,]|^)Arora([ ;\/)(,]|$)/i,
    qqbrowser: /([ ;\/)(,]|^)QQBrowser([ ;\/)(,]|$)/i,
    mqqbrowser: /([ ;\/)(,]|^)mQQBrowser([ ;\/)(,]|$)/i,
    chrome: /([ ;\/)(,]|^)chrome([ ;\/)(,]|$)/i,
    qq: /([ ;\/)(,]|^)qq([ ;\/)(,]|$)/i,
    microMessenger: /([ ;\/)(,]|^)MicroMessenger([ ;\/)(,]|$)/i,
    sogouMobileBrowser: /([ ;\/)(,]|^)sogouMobileBrowser([ ;\/)(,]|$)/i,
    baidubrowser: /([ ;\/)(,]|^)baidubrowser([ ;\/)(,]|$)/i,
    weibo: /([ ;\/)(,]|^)weibo([ ;\/)(,]|$)/i,
    firefox: /([ ;\/)(,]|^)Firefox([ ;\/)(,]|$)/i,
    //手机百度
    baiduboxapp: /([ ;\/)(,]|^)baiduboxapp([ ;\/)(,]|$)/i,
  },
};

function getBrowser() {
  let browser = '';
  let os = '';
  if (isMobile) {
    if (/iPhone|iPod|iPad|iWatch/.test(UA)) {
      os = 'ios';
    } else if (/Android/.test(UA)) {
      os = 'android';
    }
  } else {
    if (/Windows/.test(UA)) {
      os = 'windows';
    } else if (/Macintosh|Mac OS/.test(UA)) {
      os = 'mac';
    }
  }

  if (/MicroMessenger/.test(UA)) {
    browser = 'wechat';
  } else if (/QQ|SQ/.test(UA)) {
    browser = 'qq';
  } else if (/Chrome/.test(UA)) {
    browser = 'chrome';
  } else if (/Safari/.test(UA)) {
    browser = 'safari';
  }

  return {
    browser,
    os,
  };
}

let env = getBrowser();

const isAndroid = env.os === 'android';
const isIOS = env.os === 'ios';
const isMobileQQ = env.browser === 'qq' && isMobile;
const isWechat = env.browser === 'wechat' && isMobile;
const isSafari = env.browser === 'safari' && isMobile;
export {
  isMobile,
  isAndroid,
  isIOS,
  isMobileQQ,
  isWechat,
  isSafari
};
