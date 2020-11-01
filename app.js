//app.js
App({
  userInfo: null,
  // 当用户启动小程序的时候发起onLaunch函数
  onLaunch() {
    // 启动时获取用户信息
    wx.getSetting({
      success: res => {
        // 判断是否授权用户信息
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
          success: res =>{
            this.userInfo = res.userInfo
            // 判断是否有人调用了回调函数来获取用户信息
            if(this.userInfoReadyCallBack(res)){
              this.userInfoReadyCallBack(res)
            }
          }
          })
        }
      }
    })
  }
})