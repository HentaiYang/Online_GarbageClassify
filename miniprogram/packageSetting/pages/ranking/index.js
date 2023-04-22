// packageSetting/pages/ranking/index.js

const INIT_MARKER = {
  callout: {
    content: '关注人数: 1000',
    padding: 10,
    borderRadius: 2,
    display: 'ALWAYS'
  },
  latitude: 36.963586899,
  longitude: 118.08919545,
  iconPath: './imgs/Marker1_Activated@3x.png',
  width: '34px',
  height: '34px',
  rotate: 0,
  alpha: 1
};
const shijihy = {
  callout: {
    content: '关注人数: 500',
    padding: 10,
    borderRadius: 2,
    display: 'ALWAYS'
  },
  latitude: 36.796074,
  longitude: 118.03334,
  iconPath: './imgs/Marker1_Activated@3x.png',
  width: '34px',
  height: '34px',
  rotate: 0,
  alpha: 1
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: {
      latitude: 36.810924,
      longitude: 117.999504
    },
    markers: [{
      ...INIT_MARKER
    },{
      ...shijihy
    }],
    scale: 15
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