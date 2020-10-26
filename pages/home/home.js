// 导入API文件
const api = require('../../api/api.js')
Page({
  data: {
    filmTypes: []
  },
  onReady: function () {
    this.loadHomeData()
    // this.loadHotFilm()
  },
  // 获取影院热映的数据
  // loadHotFilm () {
  //   wx.request({
  //     url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
  //     data:{
  //       start: 0,
  //       count:6
  //     },
  //     success: (res) => {
  //       let hotFilm = {
  //         title: res.data.subject_collection.name,
  //         list: res.data.subject_collection_items
  //       }
  //       // this.data.filmTypes.push(hotFilm)  //这样设置虽然成功，但是无法渲染数据
  //       this.setData({
  //         'filmTypes[0]': hotFilm
  //       })
  //       console.log(this.data.filmTypes)
  //     },
  //     fail: (error) => {},
  //   })
  // }
  loadHomeData() {
    // 加载热映电影
    api.loadHotFilm({
      start: 0,
      count: 6
    }).then(data => {
      let hotFilm = {
        title: data.subject_collection.name,
        list: data.subject_collection_items,
        method: data.method
      }
      this.setData({
        'filmTypes[0]': hotFilm
      })
    }).catch(api.showError)
    // 加载最新电影
    api.loadLastedFilm({
      start: 0,
      count: 6
    }).then(data => {
      let lastedFilm = {
        title: data.subject_collection.name,
        list: data.subject_collection_items,
        method: data.method
      }
      this.setData({
        'filmTypes[1]': lastedFilm
      })
    }).catch(api.showError)
    // 加载免费电影
    api.loadFreeFilm({
      start: 0,
      count: 6
    }).then(data => {
      let freedFilm = {
        title: data.subject_collection.name,
        list: data.subject_collection_items,
        method: data.method
      }
      this.setData({
        'filmTypes[2]': freedFilm
      })
    }).catch(api.showError)
    console.log(this.data.filmTypes)
  }
})