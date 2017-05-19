'use strict'
//登录服务示例
angular.module('core').factory('crLogin', () => {
  let store = {
    isLogin: false
  }
  return {
    get(key) {
      return store[key]
    },
    set(key, value) {
      store[key] = value
    }
  }
})