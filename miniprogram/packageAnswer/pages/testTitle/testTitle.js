// packageAnswer/pages/testTitle/testTitle.js
const db = wx.cloud.database()
const dbPoints = db.collection('points')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userinfo: [],
    pointsData: [],
    pointsData: {
      answerNumber: 0
    }
  },
  test() {
    wx.cloud.callFunction({
      name: 'updataPointsInDay',
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.error(err);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.isLogin()
    let openid = await this.getOpenidByCould()
    console.log(openid);
    this.setData({
      openid: openid
    })
    // 判断是否是第一次进入答题界面 false 第一次
    let isFirstAnswer = await this.isFirstAnswer(openid)
    console.log(isFirstAnswer);
    if (isFirstAnswer.status == false) {
      // 初始化数据库
      this.initAnswerPointsDB()

      wx.hideLoading({
        success: (res) => {
          this.onLoad()
        },
      })
    } else {
      this.setData({
        pointsData: isFirstAnswer.pointsData,
        docId: isFirstAnswer.pointsData._id,
        date: this.formatTime(isFirstAnswer.pointsData.date)
      }, () => {
        wx.hideLoading({
          success: (res) => {},
        })
      })
    }


  },
  // 是否登录了
  isLogin() {
    let userinfo = wx.getStorageSync('userInfoStorage')
    if (userinfo == '') {
      wx.showToast({
        icon: 'error',
        title: '您还未登录！',
      })
      this.setData({
        isLogin: false
      })
      return
    } else {
      this.setData({
        userinfo: userinfo
      })
    }

  },
  // 获取openid  异步
  getOpenidByCould() {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getUser',
        success: (res) => {
          const openid = res.result.event.userInfo.openId
          resolve(openid)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })

  },
  // 判断是否是第一次进入答题界面
  isFirstAnswer(openid) {
    return new Promise((resolve, reject) => {
      dbPoints.where({
          _openid: openid
        })
        .get()
        .then((res) => {
          let getPointsData = res.data[0]
          // 如果没有查到openid
          if (res.data.length == 0) {
            resolve({
              status: false
            })
          }
          // 查到openid
          else {
            resolve({
              status: true,
              pointsData: getPointsData
            })
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err)
        })
    })
  },
  // 初始化该用户的答题数据库
  initAnswerPointsDB() {
    return new Promise((resolve, reject) => {
      dbPoints.add({
          data: {
            points: 0,
            answerNumber: 3,
            date: new Date(),
            firstInAnswer: new Date(),
            rightNumber: 0,
            wrongNumber: 0
          }
        }).then((res) => {
          console.log(res);
          resolve({
            status: 200,
            errMsg: res.errMsg
          })
        })
        .catch((err) => {
          console.error(err);
          reject({
            status: 400,
            errMsg: err
          })
        })
    })
  },
  // 获取答题信息数据
  getAnswerData(openid) {
    return new Promise((resolve, reject) => {
      dbPoints.where({
          _openid: openid
        }).get()
        .then((res) => {
          resolve({
            status: 200,
            data: res.data[0]
          })
        })
        .catch((err) => {
          reject({
            status: 400,
            errMsg: err
          })
        })
    })
  },
  formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  },

  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  start() {
    if (this.data.pointsData.answerNumber !== 0) {
      wx.navigateTo({
        url: '../test/test?openid=' + this.data.openid,
        success: (res) => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            data: {
              openid: this.data.openid,
              docId: this.data.docId,
              answerNumber: this.data.pointsData.answerNumber,
            }
          })
        }
      })

    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    wx.showLoading({
      title: '加载中...',
    })
    let openid = await this.getOpenidByCould()
    // console.log(openid);
    this.setData({
      openid: openid
    })
    // 判断是否是第一次进入答题界面 false 第一次
    let isFirstAnswer = await this.isFirstAnswer(openid)
    console.log(isFirstAnswer);
    if (isFirstAnswer.status == false) {
      wx.showToast({
        icon:'error',
        title: '您还未登录',
      })
      return
    } else {
      this.setData({
        pointsData: isFirstAnswer.pointsData,
        docId: isFirstAnswer.pointsData._id,
        date: this.formatTime(isFirstAnswer.pointsData.date)
      }, () => {
        wx.hideLoading({
          success: (res) => {},
        })
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
})