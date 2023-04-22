// pages/search/search.js
const db = wx.cloud.database()
const garbagesList = require("../../utils/garbagesListNew.js")

let btnCount = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    cacheList1: [],
    cacheList2: [],
    cacheList3: [],
    cacheList4: [],
    cacheList5: [],
    garbagesList: [],
    showCacheList: [],
    showList: [],
    classList: ['[有害垃圾]', '[可回收垃圾]', '[厨余垃圾]', '[其他垃圾]', '[专业垃圾,请资讯物业]', ],
    pageIndex: 1,
    listLength: 0,
    showEmpty: false,
    btnValue: "",
    buttonNum: 0,
    btnAbled: true,
    score: 0
  },
  // 重置数据
  resetData() {
    this.setData({
      garbagesList: [],
      showCacheList: [],
      showList: [],
      pageIndex: 1,
      btnAbled: true
    })
  },
  // 加载搜索出来的列表内容
  loadShowList(value) {
    // 判断输入内容是否存在
    if (value) {
      // 将输入内容作为正则表达式
      let pattern = new RegExp(value, 'i')
      this.resetData()
      for (let i = 0; i < garbagesList[1]["data"].length; i++) {
        for (let j = 0; j < garbagesList[1]["data"][i]["dataList"].length; j++)
        // 正则表达式匹配输入内容与列表数据('i'不区分大小写)
          if (pattern.test(this.data.cacheList1["data"][i]["dataList"][j])) {
            this.data.garbagesList.push({
              "name": this.data.cacheList1["data"][i]["dataList"][j],
              "class": this.data.cacheList1["class"]
            })
          }
      }
      for (let i = 0; i < garbagesList[2]["data"].length; i++) {
        for (let j = 0; j < garbagesList[2]["data"][i]["dataList"].length; j++)
          if (pattern.test(this.data.cacheList2["data"][i]["dataList"][j])) {
            this.data.garbagesList.push({
              "name": this.data.cacheList2["data"][i]["dataList"][j],
              "class": this.data.cacheList2["class"]
            })
          }
      }
      for (let i = 0; i < garbagesList[3]["data"].length; i++) {
        for (let j = 0; j < garbagesList[3]["data"][i]["dataList"].length; j++)
          if (pattern.test(this.data.cacheList3["data"][i]["dataList"][j])) {
            this.data.garbagesList.push({
              "name": this.data.cacheList3["data"][i]["dataList"][j],
              "class": this.data.cacheList3["class"]
            })
          }
      }
      for (let i = 0; i < garbagesList[4]["data"].length; i++) {
        for (let j = 0; j < garbagesList[4]["data"][i]["dataList"].length; j++)
          if (pattern.test(this.data.cacheList4["data"][i]["dataList"][j])) {
            this.data.garbagesList.push({
              "name": this.data.cacheList4["data"][i]["dataList"][j],
              "class": this.data.cacheList4["class"]
            })
          }
      }
      for (let i = 0; i < garbagesList[5]["data"].length; i++) {
        for (let j = 0; j < garbagesList[5]["data"][i]["dataList"].length; j++)
          if (pattern.test(this.data.cacheList5["data"][i]["dataList"][j])) {
            this.data.garbagesList.push({
              "name": this.data.cacheList5["data"][i]["dataList"][j],
              "class": this.data.cacheList5["class"]
            })
          }
      }
      let listLength = this.data.garbagesList.length
      this.setData({
        pageIndex: 1,
      })
      if (listLength)
        this.showList(1)
      else {
        if (!this.data.showEmpty) {
          this.setData({
            showEmpty: true,
            btnValue: "把" + '"' + this.data.inputValue + '"' + "提交给我们"
          })
        } else {
          this.setData({
            btnValue: "把" + '"' + this.data.inputValue + '"' + "提交给我们"
          })
        }
      }
    } else {
      this.resetData()
      this.setData({
        showEmpty: false
      })
    }
  },
  // 渲染列表内容(每次渲染20条)
  showList(pageIndex) {
    for (let i = (pageIndex - 1) * 20; i < pageIndex * 20; i++)
      if (this.data.garbagesList[i])
        this.data.showCacheList.push(this.data.garbagesList[i])
    this.setData({
      showList: this.data.showCacheList,
    })
    console.log("加载页数: ", pageIndex)
  },
  // 取消搜索返回到上一层
  searchCancel() {
    wx.navigateBack()
  },
  // 实时输入内容并修改搜索结果
  getInputValue(e) {
    this.loadShowList(this.data.inputValue)
  },
  // 初始化列表内的所有内容
  classListChange() {
    this.setData({
      cacheList1: garbagesList[1],
      cacheList2: garbagesList[2],
      cacheList3: garbagesList[3],
      cacheList4: garbagesList[4],
      cacheList5: garbagesList[5],
    })
  },
  // 搜索结果为空，可以将搜索结果上传到云数据库
  subValue(e) {
    let date = new Date()
    btnCount++
    db.collection('emptySearch').where({
        name: this.data.inputValue
      }).get()
      .then(res => {
        console.log("res", res)
        if (!res.data.length) {
          db.collection('emptySearch').add({
            data: {
              name: this.data.inputValue,
              date: date
            }
          }).then(res => {
            console.log("res:", res)
          }).catch(err => {
            console.log("err:", err)
          })
        } else {
          console.log("内容已存在")
        }
      })
      .catch(err => {
        console.log("err", err)
      })
      // 点击一次后将按钮禁用
    this.setData({
      buttonNum: btnCount,
      btnAbled: false
    })
    // 修改按钮内容
    if (this.data.buttonNum >= 1) {
      this.setData({
        btnValue: "谢谢您的反馈"
      })
    }
    console.log(this.data.buttonNum)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    this.classListChange()
    this.setData({
      inputValue: options.value
    })
    this.loadShowList(options.value)
    // // 获取搜索页面输入的内容传到当前页面
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('acceptInputValue', res => {
    //   this.setData({
    //     inputValue: options.data
    //   })
    //   this.loadShowList(res.data)
    // })
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
      this.data.pageIndex++
      this.showList(this.data.pageIndex)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})