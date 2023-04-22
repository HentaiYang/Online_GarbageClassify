// packageManager/pages/managelogin/index.js
const db = wx.cloud.database()
const manageAuth = db.collection('manageAuth')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logined: false
  },
  onMyLogin() {
    wx.showLoading({
      title: '登陆中...',
    })
    wx.cloud.callFunction({
      name: 'getUser',
      success: (res) => {
        console.log(res.result.event.userInfo)
        // 检查权限
        this.checkAuth(res.result.event.userInfo.openId)
      },
      fail: (err) => {
        console.error(err)
      }
    })
  },
  checkAuth(openid) {
    console.log(openid);
    manageAuth.doc('b00064a760b1eef61c12873c7551bfc2').get().then((res) => {
      console.log(res.data.root);
      let root = res.data.root
      root.forEach((e, index) => {
        if (e.openid == openid) {
          this.setData({
            logined: true
          })
          wx.hideLoading({
            success: (res) => {
              wx.showToast({
                title: '登陆成功',
              })
            },
          })
          this.navigator(e.openid, e.auth, e.userName)
          return
        }
      })
    })
  },

  navigator(openid, auth, userName) {
    wx.redirectTo({
      url: '../managePanel/index?openid=' + openid + '&auth=' + auth + '&userName=' + userName,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})