const db = wx.cloud.database()
const sources = db.collection('sources')
// 引入数据库配置文件
const dbconfig = require('../../utils/dbConfig')

Component({

  /**
   * 页面的初始数据
   */
  data: {
    indexSwiper: [],
    adSource: [],
    steps: [],
    activePages: [],
    stepsActive: 0,
    stepsWidth: ''
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0,
        })
      }
    }
  },
  methods: {

    navigator(e) {
      console.log(e);
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0,
        })
      }
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

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     indexSwiper: [],
//     adSource: [],
//     steps: [],
//     activePages: [],
//     stepsActive: 0,
//     stepsWidth: ''
//   },
//   navgater() {
//     wx.navigateTo({
//       url: '../test/test',
//     })
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     sources.doc(dbconfig.dbconfig.dbSwiperId)
//       .get()
//       .then((res) => {
//         console.log(res.data)
//         const width = 120 * res.data.steps.length + 'px'
//         this.setData({
//           indexSwiper: res.data.indexSwiper,
//           adSource: res.data.adSource,
//           steps: res.data.steps,
//           activePages: res.data.activePages,
//           stepsActive: res.data.stepsActive,
//           stepsWidth: width
//         })
//       })
//       .catch((err) => {
//         console.error("轮播图数据库获取失败: ", err)
//       })
//   },
//   navigator(e){
//     console.log(e);
//     wx.redirectTo({
//       url: e.currentTarget.dataset.url,
//     })
//   },
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//     // show() {
//     if (typeof this.getTabBar === 'function' &&
//       this.getTabBar()) {
//       this.getTabBar().setData({
//         selected: 0,
//       })
//     }
//     // }
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })


// 版权所有:tel:+8613943218461,QQ:1987795215,微信：nws1987795215,duan1619794359