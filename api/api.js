// API请求的模块化处理，将项目中所有的请求进行统一的管理
// 将需要的api地址写在前面，便于使用
const URLS = {
  // 热映
  hotUrl: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
  // 最新电影
  latestUrl: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
  // 免费电影
  freeUrl: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items',
  // 电影详情
  detailUrl: 'https://m.douban.com/rexxar/api/v2/movie'
}

// 当请求出错时
const showError = function (error) {
  wx.showToast({
    title: '请求错误！',
    image: '../../images/home.png'
  })
}

const loadHotFilm = function (params = {}) { //默认是空对象
  // 基于promise对象解决函数回调问题，让首页可以拿到数据并继续处理
  // 直接返回promise对象
  return new Promise((resolve, reject) => {
    // 发送请求
    wx.request({
      url: URLS.hotUrl,
      data: params,
      success: resolve,
      fail: reject
    })
  }).then(res => { //成功
    if (res.statusCode == 200) {
      res.data.method = 'loadHotFilm'
      return res.data
    } else {
      Promise.reject({
        message: res.errMsg
      })
    }
  })
}

// 加载最新电影
const loadLastedFilm = function (params = {}) { //默认是空对象
  // 基于promise对象解决函数回调问题，让首页可以拿到数据并继续处理
  // 直接返回promise对象
  return new Promise((resolve, reject) => {
    // 发送请求
    wx.request({
      url: URLS.latestUrl,
      data: params,
      success: resolve,
      fail: reject
    })
  }).then(res => { //成功
    if (res.statusCode == 200) {
      res.data.method = 'loadLastedFilm'
      return res.data
    } else {
      Promise.reject({
        message: res.errMsg
      })
    }
  })
}
// 加载免费电影
const loadFreeFilm = function (params = {}) { //默认是空对象
  // 基于promise对象解决函数回调问题，让首页可以拿到数据并继续处理
  // 直接返回promise对象
  return new Promise((resolve, reject) => {
    // 发送请求
    wx.request({
      url: URLS.freeUrl,
      data: params,
      success: resolve,
      fail: reject
    })
  }).then(res => { //成功
    if (res.statusCode == 200) {
      res.data.method = 'loadFreeFilm'
      return res.data
    } else {
      Promise.reject({
        message: res.errMsg
      })
    }
  })
}
module.exports = {
  showError,
  loadHotFilm,
  loadLastedFilm,
  loadFreeFilm
}