/**
 * @file dom-data.js
 * @module dom-data
 */
import * as Guid from './guid.js';

/**
 * 元素数据 Store
 *
 * 允许给元素绑定数据而无需直接添加到元素，列如，事件就可以存在这
 * (also from jsninja.com, slightly modified and updated for closure compiler)
 *
 * @type {Object}
 * @private
 */
const elData = {};

/*
 * 添加包含元素Guid的特殊属性到store
 *
 * @type {String}
 * @constant
 * @private
 */
const elIdAttr = 'vdata' + (new Date()).getTime();

/**
 * 获取存储元素数据的缓存对象
 *
 * @param {Element} el
 *        Element to store data for.
 *
 * @return {Object}
 *         The cache object for that el that was passed in.
 */
export function getData(el) {
  let id = el[elIdAttr];

  if (!id) {
    id = el[elIdAttr] = Guid.newGUID();
  }

  if (!elData[id]) {
    elData[id] = {};
  }

  return elData[id];
}

/**
 * 判断元素是否有缓存数据
 *
 * @param {Element} el
 *        Check if this element has cached data.
 *
 * @return {boolean}
 *         - True if the DOM element has cached data.
 *         - False otherwise.
 */
export function hasData(el) {
  const id = el[elIdAttr];

  if (!id) {
    return false;
  }

  return !!Object.getOwnPropertyNames(elData[id]).length;
}

/**
 * 从缓存中删除元素的数据，并从getElementById中删除guid attr
 *
 * @param {Element} el
 *        Remove cached data for this element.
 */
export function removeData(el) {
  const id = el[elIdAttr];

  if (!id) {
    return;
  }

  // Remove all stored data
  delete elData[id];

  // Remove the elIdAttr property from the DOM node
  try {
    delete el[elIdAttr];
  } catch (e) {
    if (el.removeAttribute) {
      el.removeAttribute(elIdAttr);
    } else {
      // IE doesn't appear to support removeAttribute on the document element
      el[elIdAttr] = null;
    }
  }
}
