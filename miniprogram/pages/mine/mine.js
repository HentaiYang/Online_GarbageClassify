// pages/mine/mine.js
const {
  dbconfig
} = require('../../utils/dbConfig')
const db = wx.cloud.database()
const setting = require('../../utils/setingConfig')
// 用户数据
const userList = db.collection('userList')
Component({
  /**
   * 页面的初始数据
   */
  data: {
    root: false,
    portrait: "",
    openid: '',
    userName: "点击登录",
    sex: "男",
    location: "淄博",
    score: "0",
    ranking: "0",
    userShow: false,
    setting: []
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3,
        })
      }
    }
  },
  methods: {

    login() {
      wx.showLoading({
        title: '登陆中',
      })
      // 判断页面被隐藏时启用登录按钮
      if (!this.data.userShow) {
        // 获取用户信息
        wx.getUserProfile({
          desc: '用于页面显示',
          success: async (userProfile) => {
            console.log("userProfile:", userProfile)
            let checkUserData = await this.checkUser()
            this.setData({
              openid: checkUserData.openid
            })
            if (checkUserData.status == 0) {
              console.log("用户第一次登陆");
              // 初始化数据库
              let userData = {}
              userData = {
                userName: userProfile.userInfo.nickName, //昵称
                sex: userProfile.userInfo.gender, //性别
                portrait: userProfile.userInfo.avatarUrl, //头像
                score: 0, //积分
                community: '', //社区
                rank: 0, //排名
              }
              this.writeToDataBase(userData)
            } else if (checkUserData.status == 1) {
              console.log("用户已登录过");
              wx.hideLoading({
                success: (res) => {},
              })
            }


            this.setData({
              userShow: true,
              userName: userProfile.userInfo.nickName,
              sex: userProfile.userInfo.gender,
              portrait: userProfile.userInfo.avatarUrl
            })
            // 需要缓存的数据
            let userInfoStorage = {
              userShow: true,
              userName: userProfile.userInfo.nickName,
              openid: this.data.openid,
              sex: userProfile.userInfo.gender,
              portrait: userProfile.userInfo.avatarUrl
            }
            // 将用户信息加入缓存
            wx.setStorage({
              key: 'userInfoStorage',
              data: userInfoStorage,
              success: (res) => {
                console.log(res)
              }
            })
          }
        })
      }
      
    },
    // 查看数据库是否存在用户数据
    checkUser() {
      return new Promise((resolve, reject) => {
        // 获取openid
        wx.cloud.callFunction({
          name: 'getUser',
          success: (res) => {
            console.log(res.result.event.userInfo.openId);
            const openid = res.result.event.userInfo.openId
            userList.where({
                _openid: openid
              })
              .get()
              .then((res) => {
                console.log(res.data)
                if (res.data.length == 0) {
                  resolve({
                    status: 0,
                    openid: openid
                  })
                } else {
                  resolve({
                    status: 1,
                    openid: openid
                  })
                }
              })
              .catch((err) => {
                console.error(err);
                // reject()
              })
          }
        })
      })
    },
    // 写入数据库数据
    writeToDataBase(userData) {
      userList.add({
          data: userData
        })
        .then((res) => {
          console.log(res);
          wx.hideLoading({
            success: (res) => {},
          })
        })
        .catch((err) => {
          console.error(err);
          wx.hideLoading({
            success: (res) => {},
          })
        })
    },
    // 跳转设置页面
    navigate() {
      wx.navigateTo({
        url: '../setup/setup',
      })
    },
    // 获取积分信息
    getPointsData(openid) {
      userList.where({
          _openid: openid
        }).get()
        .then((res) => {
          this.setData({
            rank: res.data[0].rank,
            score: res.data[0].score
          })
        })
        .catch((err) => {
          console.error(err);
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(setting)
      this.setData({
        setting: setting.setting
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
      // 切换到页面时获取缓存信息修改当前页面显示
      let getInfoStorage = wx.getStorageSync('userInfoStorage')
      console.log("缓存数据:", getInfoStorage)
      if (getInfoStorage) {
        this.setData({
          userShow: getInfoStorage.userShow,
          userName: getInfoStorage.userName,
          sex: getInfoStorage.sex,
          portrait: getInfoStorage.portrait,
          openid: getInfoStorage.openid
        }, () => {
          this.getPointsData(getInfoStorage.openid)
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