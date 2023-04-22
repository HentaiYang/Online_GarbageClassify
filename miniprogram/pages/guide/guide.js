// pages/guide/guide.js
const garbagesList = require("../../utils/garbagesListNew.js")

let classIndex = 1
let pageIndex = 1
Component({
  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    cacheList: [],
    listWidth: [],
    garbagesList: [],
    selectColor: '',
    imageURL: '',
    classTitle: '',
    definition: '',
    requires: [],
    active: 0,
    activeCollapse: [1, 2],
    inputValue: '',
  },
  pageLifetimes: {
    //自定义tabbar
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1,
        })
      }
    }
  },
  methods: {
    navigate: function () {
      const inputValue = this.data.inputValue
      wx.navigateTo({
        url: '../search/search?value=' + this.data.inputValue,
        success(res) {
          // console.log(res)
          res.eventChannel.emit('acceptInputValue', {
            data: inputValue
          })
        }
      })
    },
    //指南内容列表更新
    classListChange(state, classIndex, pageIndex) {
      return new Promise((resolve, reject) => {
        this.setData({
          classTitle: this.data.cacheList[classIndex].name,
          definition: this.data.cacheList[classIndex].definition,
          requires: this.data.cacheList[classIndex].requires,
          imageURL: '../../imgs/' + classIndex + '.jpg',
          selectColor: this.data.cacheList[classIndex].color
        })
        let classLength = this.data.cacheList[classIndex].data.length
        for (let i = 0; i < classLength; i++) {
          //遍历每个大类中的小类个数，增加相应个数的字典
          if (state == 1) {
            this.data.garbagesList.push({
              "name": [],
              "value": []
            })
            //初次为每个字典添加键name的值
            this.data.garbagesList[i]["name"].push(this.data.cacheList[classIndex].data[i].name)
          }
          //二次遍历每个小类中数据的数量，加入键value对应的值
          if (classLength == 1) {
            this.showList(classIndex, i, 4, pageIndex, state)
              .then((res) => {
                this.setData({
                  garbagesList: this.data.garbagesList
                }, () => {
                  resolve()
                })
              })
          } else {
            this.showList(classIndex, i, 2, pageIndex, state)
              .then((res) => {
                this.setData({
                  garbagesList: this.data.garbagesList
                }, () => {
                  resolve()
                })
              })
          }
        }

      })

    },
    // 列表内容渲染
    showList(classIndex, index, num, pageIndex, state) {
      return new Promise((resolve, reject) => {
        if (state == 1)
          for (let j = (pageIndex - 1) * num * 5; j < pageIndex * num * 5; j++) {
            // console.log(j)
            // console.log(pageIndex * num * 5)
            if (this.data.cacheList[classIndex].data[index].dataList[j])
              this.data.garbagesList[index]["value"].push(this.data.cacheList[classIndex].data[index].dataList[j])
            if (j == pageIndex * num * 5 - 1) {
              // console.log("for puase  resolve")
              resolve()
            }
          }
        else {
          for (let j = (pageIndex - 1) * num * 15; j < pageIndex * num * 15; j++) {
            if (this.data.cacheList[classIndex].data[index].dataList[j - 10])
              this.data.garbagesList[index]["value"].push(this.data.cacheList[classIndex].data[index].dataList[j - 10])
            if (j == pageIndex * num * 15 - 1) {
              // console.log("for puase  resolve")
              resolve()
            }
          }

        }
      })
    },
    slideToTop: function () {
      wx.createSelectorQuery().selectAll(".rightList").boundingClientRect((res) => {
        // console.log("boundingClientRect", res) //获取列表元素数组
        // console.log(res[0].top) //第一个元素的顶部位置信息
        // 设置屏幕滑动位置
        if (res[0].top < 93.96115112304688)
          wx.pageScrollTo({
            scrollTop: res[0].top,
            duration: 400,
          })
      }).exec()
    },
    //切换侧边栏
    sidebarChange: function (e) {
      classIndex = e.detail + 1,
        pageIndex = 1,
        this.setData({
          activeKey: e.detail,
          garbagesList: [],
          activeCollapse: [1, 2]
        })
      //同时更新相应的大类
      this.classListChange(1, classIndex, pageIndex)
        .then((res) => {
          this.slideToTop()
        })

      // console.log("侧栏标签序列:" + this.data.activeKey, "类别数：" + classIndex)
    },
    collapseChange(event) {
      this.setData({
        activeCollapse: event.detail,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
      this.setData({
        cacheList: garbagesList
      })
      this.classListChange(1, classIndex, pageIndex)
      wx.getSystemInfo({
        success: (result) => {
          // console.log(result) 获取屏幕宽度，动态调节列表宽度
          this.setData({
            listWidth: result.screenWidth - 105 + 'px'
          })
        },
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
      // this.slideToTop()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      this.setData({
        inputValue: ""
      })
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
      pageIndex++
      this.classListChange(2, classIndex, pageIndex)
      // console.log("加载页面总数：" + pageIndex)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  }
})