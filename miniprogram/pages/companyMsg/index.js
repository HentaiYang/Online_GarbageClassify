// miniprogram/pages/companyMsg/index.js
const app = getApp()
const db = wx.cloud.database()

const sources = db.collection('sources')

const dbconfig = require('../../utils/dbConfig')
Component({

  /**
   * 页面的初始数据
   */
  data: {
    companiesZhouCun: [],
    companiesZhangDian: []
  },
  methods: {
    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
      wx.showLoading({
        title: '加载中...',
      })
      // 获取云数据库公司信息内容
      sources.doc(dbconfig.dbconfig.companies).get()
        .then((res) => {
          // 输出由上一页返回的垃圾类目所对应的公司数据
          console.log(res.data.companies[options.group])
          this.setData({
            companiesZhouCun: res.data.companies[options.group]["周村"]
          }, () => {
            wx.hideLoading({
              success: (res) => {},
            })
          })
        })
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
  }
})