// miniprogram/custom-tab-bar/index.js
const app = getApp()
Component({
  data: {
    selected: 0,
    tabbarList: [{
      url: "/pages/index/index",
      icon: "/imgs/tabbarSrc/index.png",
      text: "主页"
    }, {
      url: "/pages/guide/guide",
      icon: "/imgs/tabbarSrc/guide.png",
      text: "指南"
    }, {
      url: "/pages/reclaim/reclaim",
      icon: "/imgs/tabbarSrc/reclaim.png",
      text: "回收"
    }, {
      url: "/pages/mine/mine",
      icon: "/imgs/tabbarSrc/mine.png",
      text: "我的"
    }]
  },
  methods:{
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log("页面跳转: ", data.name, url)
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})