'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.throttle = throttle;
exports.default = {
  /*
  //自己常用的函数注册到全局
  import myUtils from './utils/myUtils';
  for (let zhi in myUtils) {Vue.prototype[zhi] = myUtils[zhi];}
   */

  //可链式 示例 ask(shuJu, ".item.name")
  ask: function ask(obj, keyName) {
    var isNoStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--';
    var isEval = arguments[3];

    try {
      // debugger
      if (isEval) {
        eval('keyName = obj' + keyName.replace(/\s/g, '').replace(/\?/g, '').split('.').join('?.'));
        return keyName === 0 ? keyName : keyName || isNoStr;
      }

      if (!obj) return isNoStr;
      var keys = keyName.replace(/\s/g, '').replace(/\?/g, '').split('.');
      var tempObj = obj;
      for (var i in keys) {
        if (!tempObj) return isNoStr;
        keys[i] ? tempObj = tempObj[keys[i]] : '';
      }
      return tempObj === 0 ? tempObj : tempObj || isNoStr;
    } catch (error) {
      return isNoStr;
    }
  },

  //时间戳转日期
  toLocaleDateString: function toLocaleDateString(time) {
    time = parseFloat(time);
    if (!time) return '--';
    if ((time + "").length <= 10) {
      // 是否乘以
      time = time * 1000;
    }
    return new Date(time).toLocaleDateString("zh-CN", {
      timeZone: "Asia/Shanghai"
    });
  },

  //时间戳转日期时分秒
  toLocaleString: function toLocaleString(time) {
    time = parseFloat(time);
    if (!time) return '--';
    if ((time + "").length <= 10) {
      // 是否乘以
      time = time * 1000;
    }
    return new Date(time).toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai"
    });
  },

  //跳转路由
  toUrl: function toUrl(url) {
    this.$router.push(url);
  },

  //时间 时分秒
  increment: function increment(time) {
    time = parseFloat(time);
    var h = Math.floor(time / 3600).toString().padStart(1, "0");
    var m = Math.floor(time % 3600 / 60).toString().padStart(2, "0");
    var s = Math.floor(time % 3600 % 60).toString().padStart(2, "0");
    return h + ':' + m + ':' + s;
  }
};

// 事件参数$event <input type="text" @input="xxxx( 'hello' , $event)" />

//防抖 最后一次生效 不注册到全局 单独引入
/*//
 methods: {
  myFunc: debounce(function(e) {
    console.log(1)
  }, 1000), }*/

function debounce(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

  var timer = null;
  return function () {
    var _this2 = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.call.apply(fn, [_this2].concat(args));
    }, delay);
  };
}
// 节流 第一次生效
function throttle(fn) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

  var timer = null;
  return function () {
    if (timer) {
      return;
    }
    var _this = this;
    timer = setTimeout(function () {
      timer = null;
    }, time);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    fn.apply(_this, args);
  };
}
