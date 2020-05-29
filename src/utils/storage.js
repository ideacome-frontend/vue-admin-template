
/**
 * 设置，添加，删除本地存储
 *obj {name:'id',value:id};
 key:则存储字段名称；
 */
export function setStorage(key, value) {
  window.localStorage.setItem(key, value)
}

export function getStorage(key) {
  return localStorage.getItem(key)
}

export function deleteStorage(key) {
  window.localStorage.removeItem(key)
}

/* 清除所有本地信息*/
export function storageClear() {
  window.localStorage.clear()
}

