const api = require('../../api/api.js')
Page({
  data: {
    method: '',
    categoryTitle: '',
    films: [],
    count: 12,
    showLoadingGif: false, // 控制loadingGif图片的显示与隐藏
    noMore: false, //控制没有更多数据的显示与隐藏
    total: 0 //记录数据总条数
  },
  onLoad: function (options) {
    // 两种方式都可以改变data中method的值，如果method需要在页面中展示，则使用this.setData的方式
    this.data.method = options.method
    // this.setData({
    //   method: options.method
    // })
  },
  onReady: function () {
    this.loadCategoryListData({
      start: 0,
      count: this.data.count
    })
  },
  // 加载分类页面数据
  loadCategoryListData(params = {}) {
    // 因为method是变量，所以要采用中括号的方式
    return api[this.data.method](
      // start:0,
      // count:12
      params
    ).then(data => {
      console.log(data)
      this.setData({
        categoryTitle: data.subject_collection.name,
        films: data.subject_collection_items,
        total: data.total
      })
    })
  },
  // 上拉加载数据
  onReachBottom() {
    if (this.data.total > this.data.films.length) {
      this.setData({
        showLoadingGif: true,
      })
      this.data.count += 9
      this.loadCategoryListData({
        start: 0,
        count: this.data.count
      }).then(() => {
        this.setData({
          showLoadingGif: false
        })
      })
    }else{
      this.setData({
        noMore: true
      })
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 将data中的相关数据重置
    this.setData({
      films: [],
      count: 12,
      total: 0 //记录数据总条数
    })
    // 重新加载数据
    this.loadCategoryListData({
      start: 0,
      count: this.data.count
    })
  }
})