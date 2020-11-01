const app = getApp()
Page({
  data: {
    userInfo: null,
    favorites: {}, // 缓存收藏的电影
    showNoFavorite: true, // 控制是否显示暂无收藏
  },
  // 当页面加载的时候触发
  onLoad() {
    if (app.userInfo) {
      this.setData({
        userInfo: app.userInfo
      })
    } else {
      // 由于wx.getUserInfo是异步请求，可能会在当前页面onLoad之后才返回结果，所以此处加上callback以防止这种情况
      app.userInfoReadyCallBack = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    }
  },
  // 页面从后台切换到前台的时候执行
  onShow() {
    let favorites = wx.getStorageSync('favorites')
    this.setData({
      favorites: favorites,
      showNoFavorite: Object.keys(favorites).length==0
    })
  },
  getUserInfo(e) {
    let userInfo = e.detail.userInfo
    this.setData({
      userInfo: userInfo
    })
    app.userInfo = userInfo // 将授权信息存储到全局
  },
  // 删除收藏
  removeFavorites(e){
    let id = e.target.dataset.id // 获取电影id
    let newFavorites = delete this.data.favorites[id]  // 因为缓存的时候就是用filmId: filmInfo的方式存储的，所以可以根据id删除属性
    this.setData({
      favorites: newFavorites
    })
    // 删除缓存中的电影
    wx.setStorageSync('favorites', this.data.favorites)
  }
})