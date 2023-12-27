'use strict'

export default {
  /*
  //自己常用的函数注册到全局
  import myUtils from './utils/my_utils';
  for (let zhi in myUtils) {Vue.prototype[zhi] = myUtils[zhi];}
   */


  //可链式 示例 ask(shuJu, ".item.name")
  ask(obj, keyName, isNoStr = '--') {
    try {
      // debugger
      /* eval(`keyName = obj${keyName.replace(/\s/g, '').replace(/\?/g, '').split('.').join('?.')}`);
      return keyName === 0 ? keyName : keyName || isNoStr; */

      if (!obj) return isNoStr;
      let keys = keyName.replace(/\s/g, '').replace(/\?/g, '').split('.');
      let tempObj = obj;
      for (let i in keys) {
        if (!tempObj) return isNoStr;
        keys[i] ? tempObj = tempObj?.[keys[i]] : ''
      }
      return tempObj === 0 ? tempObj : tempObj || isNoStr;
    } catch (error) {
      return isNoStr;
    }
  },
  //时间戳转日期
  toLocaleDateString(time) {
    time = parseFloat(time);
    if (!time) return '--'
    if ((time + "").length <= 10) {
      // 是否乘以
      time = time * 1000;
    }
    return new Date(time).toLocaleDateString("zh-CN", {
      timeZone: "Asia/Shanghai"
    });
  },
  //时间戳转日期时分秒
  toLocaleString(time) {
    time = parseFloat(time);
    if (!time) return '--'
    if ((time + "").length <= 10) {
      // 是否乘以
      time = time * 1000;
    }
    return new Date(time).toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai"
    });
  },
  //跳转路由
  toUrl(url) {
    this.$router.push(url);
  },
  //时间 时分秒
  increment(time) {
    time = parseFloat(time);
    var h = Math.floor(time / 3600);
    var m = Math.floor((time % 3600) / 60);
    var s = Math.floor((time % 3600) % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "0" : "") : "";
    return hDisplay + mDisplay + sDisplay;
  },



}


// 事件参数$event <input type="text" @input="xxxx( 'hello' , $event)" />

//防抖 最后一次生效 不注册到全局 单独引入
/*//
 methods: {
  myFunc: debounce(function(e) {
    console.log(1)
  }, 1000), }*/
export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay);
  }
}
// 节流 第一次生效
export function throttle(fn, time = 1000) {
  let timer = null
  return function (...args) {
    if (timer) {
      return
    }
    const _this = this
    timer = setTimeout(() => {
      timer = null
    }, time)
    fn.apply(_this, args)
  }
}
