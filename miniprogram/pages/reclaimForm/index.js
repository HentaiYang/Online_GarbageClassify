// pages/reclaimForm/index.js
const app = getApp()

const db = wx.cloud.database()
const sources = db.collection('sources')
// 引入数据库配置文件

const dbconfig = require('../../utils/dbConfig')

const date = new Date()
const dayStart = new Date().getDate()
const days = []
const hours = []

let pageClass = ''
let name = ''
let weight = ''
let appoinTime = ''
let location = ''

//调用用户信息：手机号，性别，微信昵称
const phone = wx.getStorageSync("phone")
const sex = wx.getStorageSync("userInfoStorage").sex == 1 ? "男" : "女"
const userName = wx.getStorageSync('userInfoStorage').userName

// 将回收类别，垃圾类别，预估重量，时间和地点和用户信息手机号和性别加入到表单内容
let submitForm = {}


for (let i = 8; i <= 18; i++) {
  hours.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reclaimClass: 1,
    reclaimWeight: 1,

    // page-title
    reclaimFormTitle: '有偿回收',
    reclaimFormNotice: '每笔有偿回收成交后将向公益活动捐赠1元。',
    reclaimFormPriceAndPoints: '今日指导价',

    reclaimFormIcon: [{
        icon: '../../imgs/cloth.png',
        iconUrl: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/reclaimImage/cloth.png',
        intro: '织物',
        name: 1
      },
      {
        icon: '../../imgs/papers.png',
        iconUrl: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/reclaimImage/papers.png',
        intro: '纸类',
        name: 2
      },
      {
        icon: '../../imgs/metal.png',
        iconUrl: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/reclaimImage/metal.png',
        intro: '金属',
        name: 3
      },
      {
        icon: '../../imgs/plastics.png',
        iconUrl: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/reclaimImage/plastics.png',
        intro: '塑料',
        name: 4
      },
      {
        icon: '../../imgs/glass.png',
        iconUrl: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/reclaimImage/glass.png',
        intro: '玻璃',
        name: 5
      },
    ],
    request: [{
        icon: '../../imgs/reclaim/WaterDroplets.png',
        intro: '拒绝掺水'
      },
      {
        icon: '../../imgs/reclaim/Rejectdoping.png',
        intro: '拒绝掺杂'
      },
      {
        icon: '../../imgs/reclaim/30kg.png',
        intro: '30KG起收'
      },
    ],
    weight: [{
        info: '1-50千克',
        name: 1
      },
      {
        info: '50-100千克',
        name: 2
      },
      {
        info: '100千克以上',
        name: 3
      },
    ],
    warning: [
      '1.因回收成本原因，社区、写字楼、单元楼价格面议',
      '2.小于10千克不保证上门回收',
      '3.重量超过100千克，需要提交照片供回收员参考'
    ],

    timeShow: false,
    locationShow: false,

    year: date.getFullYear(),
    month: [date.getMonth() + 1],
    Month: date.getMonth() + 1,
    days: [],
    Day: date.getDate(),
    day: [],
    hours,
    hour: 12,

    timeValue: '',
    locationValue: '',
    phoneValue: '',
    //用户确认订单窗口
    formConfirmShow: false,
  },
  // 将表单内容上传到数据库
  updataForm(submitForm) {
    // console.log('上传表单内容到数据库', '表单内容: ')
    for (let items in submitForm) {
      // console.log(items, submitForm[items])
    }
    // 数据库新加入内容,更新订单的大体信息
    db.collection('RecycleOrder').add({
      data: {
        pageClass: submitForm.pageClass == 1 ? "公益回收" : "有偿回收",
        classification: submitForm.name,
        dateTime: new Date(),
        location: submitForm.location,
        phone: submitForm.phone,
        appoinTime: submitForm.appoinTime,
        score: 0,
        money: 0,
        weight: submitForm.weight,
        sex: submitForm.sex,
        userName: submitForm.userName,
        status: '处理中',
        actualWeight: "",
        iconUrl: this.data.reclaimFormPrice[this.data.reclaimClass - 1].url
      }
    })
  },

  // 关闭确认表单
  formConfirmShow() {
    this.setData({
      formConfirmShow: false
    })
  },
  // 确认提交表单
  confirmSubmit() {
    wx.navigateTo({
      url: '../reclaimIn/reclaimIn',
    })
    this.setData({
      formConfirmShow: false
    })
    this.updataForm(submitForm)
  },
  // 提交表单
  submitForm() {
    pageClass = this.data.pageClass
    name = this.data.reclaimFormPrice[this.data.reclaimClass - 1].title
    weight = this.data.weight[this.data.reclaimWeight - 1].info
    appoinTime = this.data.timeValue
    location = this.data.locationValue.name
    submitForm = {
      pageClass: pageClass,
      name: name,
      weight: weight,
      appoinTime: appoinTime,
      location: location,
      phone: phone,
      sex: sex,
      userName: userName
    }
    // 判断内容是否填写完整(如果内容完整,requirements为true,否则为false)
    let requirements = true
    for (let item in submitForm) {
      if (!submitForm[item]) {
        requirements = false
        break
      }
    }
    // console.log(requirements)
    // 如果内容完整，上传订单表单
    // 显示确认页面，用户选择是否确认内容，上传后无法更改，防止用户误操作
    if (requirements) {
      // console.log(submitForm)
      this.setData({
        formConfirmShow: true
      })
    } else {
      wx.showToast({
        title: '内容填写不完整...',
        icon: 'error',
        mask: true,
        duration: 1000
      })
      console.log('内容不完整，请重新填写，注意是否登录并填写手机号等信息')
      console.log(submitForm)
    }
  },

  bindChange(e) {
    const val = e.detail.value
    console.log(val)
    this.setData({
      day: this.data.days[val[1]],
      hour: this.data.hours[val[3]]
    }, () => {
      this.setData({
        Month: this.data.month[val[1]],
        Day: this.data.day[val[2]],
      })
    })
  },

  classOnChange(event) {
    console.log(event)
    this.setData({
      reclaimClass: event.detail,
    });
  },
  weightOnChange(event) {
    console.log(event)
    this.setData({
      reclaimWeight: event.detail,
    });
  },

  choseLocation() {
    const key = 'WRQBZ-JO3RX-G6F4A-TMDF6-O3AQE-LTBR3'; //使用在腾讯位置服务申请的key
    const referer = '淄博市绿源垃圾分类志愿服务平台'; //调用插件的app的名称
    const category = '小区';
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&category=' + category
    });
  },
  // 弹框
  timeShowPopup() {
    this.setData({
      timeShow: true
    });
  },

  timeOnClose() {
    const time = this.data.year + '年' + this.data.Month + '月' + this.data.Day + '日' + this.data.hour + '点'
    console.log("timeOnClose", time)
    this.setData({
      timeShow: false,
      timeValue: time
    });
  },
  onInput(event) {
    console.log(event.detail)
    this.setData({
      currentDate: event.detail,
    });
  },
  //获取缓存手机号
  getPhoneValue() {
    const phoneValue = wx.getStorageSync('phone')
    if (phoneValue) {
      this.setData({
        phoneValue: phoneValue
      })
    }
  },
  // 编辑手机号
  chosePhone() {
    this.setData({
      chosePhoneShow: true
    })
  },
  chosePhoneClose() {
    this.setData({
      chosePhoneShow: false
    })
  },
  phoneonChange(e) {
    // console.log(e.detail)
    this.setData({
      phoneSession: e.detail
    })
  },
  confirm() {
    if (this.data.phoneSession != '') {
      this.setData({
        phoneValue: this.data.phoneSession,
        chosePhoneShow: false
      }, () => {
        wx.setStorageSync('phone', this.data.phoneSession)
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '联系电话不能为空',
      })
    }

  },
  cancel() {
    this.setData({
      phoneSession: '',
      chosePhoneShow: false
    })
  },
  // 获取地址
  getLocationOnStorage() {
    const location = wx.getStorageSync('location')
    if (location.name) {
      this.setData({
        locationValue: location
      })
    }
  },

  // 生成预约时间
  initDays() {
    const daysNumber = this.getMonthDate()
    console.log(daysNumber);
    console.log(dayStart);
    if (daysNumber - dayStart > 7) {
      for (let i = dayStart; i <= dayStart + 7; i++) {
        days.push(i)
        // console.log(days)
        this.setData({
          days: days
        })
      }
    } else {
      let daysOne = []
      let daysTwo = []
      let month = [this.data.month[0], this.data.month[0] + 1]
      for (let i = dayStart; i <= dayStart + (daysNumber - dayStart); i++) {
        daysOne.push(i)
        days[0] = daysOne
        // console.log(days);
      }
      for (let i = 1; i <= 7 - (daysNumber - dayStart); i++) {
        daysTwo.push(i)
        days[1] = daysTwo
      }
      this.setData({
        day: days[0],
        days: days,
        month: month
      })
    }
  },
  // 当前月份的天数
  getMonthDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var d = new Date(year, month, 0);
    return d.getDate();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app)
    // console.log(options)

    // 获取手机号
    this.getPhoneValue()
    this.getLocationOnStorage()
    this.initDays()
    wx.showLoading({
      title: '加载中...',
    })
    sources.doc(dbconfig.dbconfig.reclaimFormPrice).get()
      .then((res) => {
        // console.log(res.data)
        if (options.class == 1) {
          this.setData({
            reclaimFormTitle: '公益捐赠',
            reclaimFormNotice: '最后调整时间：2021-05-23 (积分将根据市价进行动态调整)',
            reclaimFormPriceAndPoints: '积分兑换规则',
            reclaimFormPrice: res.data.reclaimFormPoints,
            pageClass: options.class
          }, () => {
            wx.hideLoading({
              success: (res) => {},
            })
          })
        } else if (options.class == 2) {
          this.setData({
            reclaimFormTitle: '有偿回收',
            reclaimFormNotice: '每笔有偿回收成交后将向公益活动捐赠1元。',
            reclaimFormPriceAndPoints: '今日指导价',
            reclaimFormPrice: res.data.reclaimFormPrice,
            pageClass: options.class
          }, () => {
            wx.hideLoading({
              success: (res) => {},
            })
          })
        }
      })
      .catch((err) => {
        console.error(err)
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
    const location = requirePlugin('chooseLocation').getLocation();
    if (location) {
      this.setData({
        locationValue: location
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