// packageManager/pages/managePanel/index.js
const db = wx.cloud.database()
const sources = db.collection('sources')
// 引入数据库配置文件
const dbconfig = require('../../../utils/dbConfig')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // welfare
    welfareNewData: [],
    // welfareShow

    activeNames: ['3'],
    active: 0,
  },
  collapseOnChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  tabsOnChange(event) {
    console.log(event.detail.title);
    wx.showToast({
      title: `切换到${event.detail.title}`,
      icon: 'none',
    });
  },

  // 获得设置数据
  getSetting() {
    sources.doc(dbconfig.dbconfig.dbSwiperId)
      .get()
      .then((res) => {
        console.log(res.data)
        const width = 120 * res.data.steps.length + 'px'
        this.setData({
          indexSwiper: res.data.indexSwiper,
          adSource: res.data.adSource,
          steps: res.data.steps,
          activePages: res.data.activePages,
          stepsActive: res.data.stepsActive,
          stepsWidth: width
        })
      })
      .catch((err) => {
        console.error("轮播图数据库获取失败: ", err)
      })
  },

  // 价格积分管理 
  // 获取数据
  getPointAndPrice() {
    sources.doc(dbconfig.dbconfig.reclaimFormPrice)
      .get()
      .then((res) => {
        console.log(res.data.reclaimFormPrice[0].date);
        this.setData({
          reclaimFormPoints: res.data.reclaimFormPoints,
          reclaimFormPrice: res.data.reclaimFormPrice
        })
      })
  },
  // 编辑数据
  stepperOnChange(event) {
    console.log(event.detail);
  },
  welfareConfirm() {
    sources.doc(dbconfig.dbconfig.dbSwiperId).update({

    })
  },


  // 跳转函数
  navgatorIndexSwiper() {
    wx.navigateTo({
      url: '../indexSwiper/indexSwiper',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getSetting()
    this.getPointAndPrice()
    this.setData({
      userDetial: options
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
})