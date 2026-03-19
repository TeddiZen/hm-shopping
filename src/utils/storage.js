// 约定一个通用键名
const INFO_KEY = 'hm_shopping_info'
const HISTORY_SEARCH = 'hm_search_list'

// 获取个人信息
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result
    ? JSON.parse(result)
    : {
        token: '',
        userId: ''
      }
}

// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 保存搜索记录
export const saveSearchList = (key) => {
  localStorage.setItem(HISTORY_SEARCH, JSON.stringify(key))
}

// 获取搜索记录
export const getSearchList = () => {
  const res = localStorage.getItem(HISTORY_SEARCH)
  return res
    ? JSON.parse(res)
    : []
}
