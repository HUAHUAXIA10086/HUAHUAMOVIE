const api = require('../../api/api')
const app = getApp()
Page({
  data: {
    filmId: '',
    filmInfo: {}, // 电影信息
    commentDetail: [], // 电影评论
    count: 10, // 初始加载的评论数量
    total: 0, // 评论的总条数
    showLoading: false, // 控制显示正在加载的效果
    noMore: false //控制没有更多数据提示的显示与隐藏
  },
  onLoad: function (options) {
    this.setData({
      filmId: options.filmId
    })
  },
  onReady: function () {
    this.loadFilmDetail()
    this.loadComentDetail({
      start: 0,
      count: this.data.count,
      order_by: 'time'
    })
  },
  loadFilmDetail() {
    api.loadFilmDetail(this.data.filmId).then(data => {
      this.setData({
        filmInfo: data
      })
    }).catch(api.showError)
  },
  loadComentDetail(params) {
    return api.loadComentDetail(this.data.filmId, params).then(data => {
      this.setData({
        total: data.total,
        commentDetail: data.interests
      })
    })
  },
  // 下拉加载更多评论
  onReachBottom() {
    if (this.data.commentDetail.length && this.data.commentDetail.length < this.data.total) {
      this.setData({
        showLoading: true
      })
      this.data.count += 10
      this.loadComentDetail({
        start: 0,
        count: this.data.count,
        order_by: 'time'
      }).then(() => {
        console.log('1')
        this.setData({
          showLoading: false
        })
        console.log('2')
      }).catch(api.showError)
    }else{
      this.setData({
        noMore: true
      })
    }
  },
  // 点击收藏
  addFavorite(){
    // 判断用户是否已经登录
    if(!app.userInfo){
      // 判断是否已经登录
      wx.showModal({
        title: '提示ing',
        content: '看官，请先登录哦~',
        success: res=>{
          if(res.confirm){
            wx.reLaunch({
              url: '/pages/about/about',
            })
          }
        }
      })
      return
    }
    // 获取本地缓存中的数据
    // 若favorites为空，则返回的是空字符串，所以需要判断赋值一个{}
    var favorites = wx.getStorageSync('favorites') || {}
    // 判断电影是否已经收藏
    if(favorites[this.data.filmId]){
      wx.showToast({
        title: '看官，收藏过啦~',
        image: '/images/star.jpg'
      })
      return
    }
    // 添加电影到本地缓存
    // 由于detail中的film对象和home中的film的对象的属性有差异，所以需要处理（接口返回数据结构不同）
    this.data.filmInfo.cover.url = this.data.filmInfo.pic.normal
    favorites[this.data.filmId] = this.data.filmInfo
    wx.setStorageSync('favorites', favorites)
    wx.showToast({
      title: '收藏成功~',
      image: '/images/starActive.jpg'
    })
  }
})