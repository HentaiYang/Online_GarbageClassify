const communityList = require('../../utils/communityList')

const db = wx.cloud.database()
const userList = db.collection('userList')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pickerShow: false,
    phoneShow: false,
    secList: ["公园街道", "体育场街道", "湖田街道", "和平街道", "科苑街道", "车站街道", "南定镇", "傅家镇", "沣水镇", "中埠镇", "房镇镇", "马尚镇"],
    thridList: ["北源社区", "王辛社区", "张辛社区", "一里社区", "商园社区", "西苑社区", "沁园社区", "金信园社区", "常青园社区", "齐赛园社区", "小西湖社区"],
    location: {
      name: '地址'
    },
    phone: '',
    phoneSession: '',
    confirmCommunity: '张店区公园街道北源社区'
  },
  // 所在社区
  bindChange(e) {
    // console.log(e.detail.value)
    // console.log(e.detail.value[0]);
    this.setData({
      secList: communityList.secList[e.detail.value[0]]
    }, () => {
      let thridList = communityList.allList[communityList.firstList[e.detail.value[0]]][communityList.secList[e.detail.value[0]][e.detail.value[1]]]
      this.setData({
        thridList: thridList
      }, () => {
        if (communityList.allList[communityList.firstList[e.detail.value[0]]][communityList.secList[e.detail.value[0]][e.detail.value[1]]][e.detail.value[2]]) {
          this.setData({
            confirmCommunity: communityList.firstList[e.detail.value[0]] + communityList.secList[e.detail.value[0]][e.detail.value[1]] + communityList.allList[communityList.firstList[e.detail.value[0]]][communityList.secList[e.detail.value[0]][e.detail.value[1]]][e.detail.value[2]]
          })
        }
        else{
          this.setData({
          confirmCommunity: communityList.firstList[e.detail.value[0]] + communityList.secList[e.detail.value[0]][e.detail.value[1]] 
        })
        }
        
      })
    })
  },



  pickerOnCancel() {
    this.setData({
      pickerShow: false
    })
    let Newlocation = {}
    // 获取旧缓存
    const Oldlocation = wx.getStorageSync('location')
    console.log(Oldlocation)
    console.log(this.data.confirmCommunity)
    Newlocation['community'] = this.data.confirmCommunity
    Newlocation['name'] = Oldlocation.name
    Newlocation['latitude'] = Oldlocation.latitude
    Newlocation['longitude'] = Oldlocation.longitude
    Newlocation['address'] = Oldlocation.address
    Newlocation['province'] = Oldlocation.province
    Newlocation['city'] = Oldlocation.city
    Newlocation['district'] = Oldlocation.district
    console.log(Newlocation)
    wx.setStorageSync('location', Newlocation)
    this.setData({
      location: Newlocation
    })
  },
  choseCommunity() {
    this.setData({
      pickerShow: true
    })
  },

  // 取件地址
  choseLocation() {
    const key = 'WRQBZ-JO3RX-G6F4A-TMDF6-O3AQE-LTBR3'; //使用在腾讯位置服务申请的key
    const referer = '淄博市绿源垃圾分类志愿服务平台'; //调用插件的app的名称
    const category = '小区';
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&category=' + category
    });
  },
  phoneShowPopup() {
    this.setData({
      phoneShow: true
    });
  },

  phoneOnClose() {
    this.setData({
      phoneShow: false
    });
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
        phone: this.data.phoneSession,
        phoneShow: false
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
      phone: '',
      phoneShow: false
    })
  },

  navgitorLogin() {
    wx.navigateTo({
      url: '../../packageManager/pages/managelogin/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      const phone = wx.getStorageSync('phone')
      const location = wx.getStorageSync('location')
      // console.log("phoneStorage", phone)
      // console.log("locationStorage", location)
      if (phone == '' || location == '') {
        wx.showToast({
          icon: 'none',
          title: '请输入您的联系电话和地址',
        })
      } else {
        this.setData({
          location: location,
          phone: phone
        })
      }
    } catch (error) {

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      firstList: communityList.firstList,

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    const location = requirePlugin('chooseLocation').getLocation();
    if (location) {
      // 重置缓存
      // 设置参数
      let Newlocation = {}
      // 获取旧缓存
      const Oldlocation = wx.getStorageSync('location')
      // console.log(Oldlocation.community)
      if (Oldlocation.community) {
        Newlocation['community'] = Oldlocation.community
      }
      Newlocation['name'] = location.name
      Newlocation['latitude'] = location.latitude
      Newlocation['longitude'] = location.longitude
      Newlocation['address'] = location.address
      Newlocation['province'] = location.province
      Newlocation['city'] = location.city
      Newlocation['district'] = location.district
      console.log(Newlocation)
      wx.setStorageSync('location', Newlocation)
      this.setData({
        location: Newlocation
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
    wx.setStorageSync('location', this.data.location)
    wx.setStorageSync('phone', this.data.phone)
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