'use strict'
//根据id和路径解析模块名
angular.module('core').factory('crModuleParse', () => {
  let parser = {}
  parser.getModuleNameByPath = (path) => {
    return path.split('/')[1]
  }
  parser.getModuleNameById = (state) => {
    return state.replace(/(([a-z]*)[A-Z]{1})?.*/, '$2')
  }
  return parser
})