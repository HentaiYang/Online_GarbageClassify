// pages/reclaimIn/reclaimIn.js
const util = require('../../utils/util.js')

const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    recycleOrders: [],
    pageShow: false
  },
  // 提交新表单
  newForm() {
    wx.redirectTo({
      url: '../reclaim/reclaim',
    })
  },
  // 返回主页
  home() {
    wx.reLaunch({
      url: '../index/index',
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
    wx.showLoading({
      title: '加载中'
    })
    // 数据库内容
    let recycleOrders = []
    // 获取当前用户openid
    wx.cloud.callFunction({
        name: 'getUser'
      })
      // 将openid传出
      .then(res => {
        return new Promise((resolve, reject) => {
          const userID = res.result.event.userInfo.openId
          resolve(userID)
        })
      })
      // resolve 成功状态，获取数据库内容
      .then(value => {
        db.collection('RecycleOrder').where({
            _openid: value
          })
          .get()
          // 将数据库内容发送到本地
          .then((res) => {
            return new Promise((resolve, reject) => {
              console.log(res.data)
              res.data.forEach(element => {
                element.dateTime = util.formatTime(element.dateTime)
                recycleOrders.push(element)
              })
              resolve()
            })
          })
          // 本地渲染数据后开启页面显示
          .then(value => {
            this.setData({
              recycleOrders: recycleOrders,
            }, () => {
              wx.hideLoading({
                success: (res) => {
                  this.setData({
                    pageShow: true
                  })
                }
              })
            })
          })
      })
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