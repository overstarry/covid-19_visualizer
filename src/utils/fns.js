"use strict";

/**
 * 是否数值类型
 * @returns {boolean}
 */
function IsNumber(val) {
  const regPos = /^\d+(\.\d+)?$/; // 非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

export const isNumber = IsNumber;

/**
 * 指示obj是否数组
 * @param obj
 * @returns {boolean}
 */
function IsArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

export const isArray = IsArray;

/**
 * 指示obj是否是非空数组
 * @param obj
 * @returns {boolean}
 */
function IsNotEmptyArray(obj) {
  if (isArray(obj)) {
    return obj.length > 0;
  }
  return false;
}

export const isNotEmptyArray = IsNotEmptyArray;

/**
 * 判断是否为DOM
 * @param obj
 * @returns {boolean}
 */
function IsDOM(obj) {
  if (typeof HTMLElement === "object") {
    return obj instanceof HTMLElement;
  } else {
    return obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string";
  }
}

export const isDOM = IsDOM;

/**
 * 是否object
 * @param {*} obj
 * @returns {boolean}
 */
function IsObject(obj) {
  if (obj == null) return false;
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export const isObject = IsObject;

/**
 * 指示obj是否是非空Object(排除null)
 * @param {*} obj
 * @returns {boolean}
 */
function IsNotEmptyObject(obj) {
  if (isObject(obj)) {
    for (var x in obj) {
      return true;
    }
  }
  return false;
}

export const isNotEmptyObject = IsNotEmptyObject;

/**
 * 格式化数据到字符串（只格式化object类型）
 * @param {object} value
 * @returns {string}
 */
function Data2String(value) {
  if (value == undefined) {
    return undefined;
  } else if (value === null) {
    return null;
  }
  const type = typeof value;
  switch (type) {
    case "string":
    case "number":
    case "boolean": {
      return value;
    }
    case "function": {
      return "[object Function]";
    }
    default: {
      var valuestr = Object.prototype.toString.call(value);
      if (
        valuestr.indexOf("[object HTML") === 0 ||
        valuestr === "[object Window]" ||
        valuestr === "[object global]"
      ) {
        return valuestr;
      }
      return JSON.stringify(value);
    }
  }
}

export const data2String = Data2String;

/**
 * 格式化字符串到数据（只格式化object类型）
 * @param {string} value
 * @returns {object}
 */
function String2Data(value) {
  if (value == undefined) {
    return undefined;
  } else if (value === null) {
    return null;
  }
  const type = typeof value;
  switch (type) {
    case "string": {
      let str;
      try {
        str = JSON.parse(value);
      } catch (ex) {
        str = value;
      }
      return str;
    }
    default: {
      return value;
    }
  }
}

export const string2Data = String2Data;

/**
 * 单位转换
 * @param {number} number
 * @returns {string}
 */
function UnitConversion(number) {
  let st = "";
  number = typeof number === "number" ? number : 0;
  if (number > 9999) {
    number = Math.ceil(number / 1000) / 10;
    st = "万";
    if (number > 9999) {
      st = "亿";
      number = Math.ceil(number / 1000) / 10;
    }
  }
  st = number + st;
  return st;
}

export const unitConversion = UnitConversion;

/**
 * 给字符串进行url解码 对应.Net的  Server.UrlDecode();<+的转义不同于js>
 * @returns {String} 返回解码后的字符串
 */
function Decode(str) {
  return decodeURIComponent(str.replace(/\+/gi, "%20"));
}

export const decode = Decode;

/**
 * 给字符串进行url编码 对应.Net的  Server.UrlEncode();<+的转义不同于js>
 * @returns {String} 返回编码后的字符串
 */
function Encode(str) {
  return encodeURIComponent(str).replace(/\%20/gi, "+");
}

export const encode = Encode;

function PadLeftZero(str) {
  return ("00" + str).substr(str.length);
}

export const padLeftZero = PadLeftZero;

/**
 * 浅合并数据
 * @param obj
 * @param data
 */
function AssignData(obj, data) {
  let _obj = {};
  Object.keys(obj).forEach(key => {
    _obj[key] = data[key];
  });
  return _obj;
}

export const assignData = AssignData;

function UUID() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23];
  var uuid = s.join("");
  return uuid;
}

export const uuid = UUID;

export default {
  isNumber,
  isArray,
  isNotEmptyArray,
  isDOM,
  isObject,
  isNotEmptyObject,
  data2String,
  string2Data,
  unitConversion,
  decode,
  encode,
  padLeftZero,
  assignData
};
