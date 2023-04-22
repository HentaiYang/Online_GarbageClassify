// packageSetting/pages/award/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    awardImage: [],
    awardData: [{
        intro: '测试1',
        url: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/awardImage/sand.png',
        id: 0
      },
      {
        intro: '测试2',
        url: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/awardImage/eaeg.png',
        id: 1
      },
      {
        intro: '测试3',
        url: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/awardImage/ewairenwuchengjiutian_3.png',
        id: 2
      },
      {
        intro: '测试4',
        url: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/awardImage/ewairenwuchengjiutian_2.png',
        id: 3
      },
      {
        intro: '测试5',
        url: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/awardImage/ewairenwuchengjiutian_1.png',
        id: 4
      },
      {
        intro: '测试6',
        url: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/awardImage/ewairenwuchengjiutian.png',
        id: 5
      },
      {
        intro: '测试7',
        url: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/awardImage/wode-gerenchengjiu.png',
        id: 6
      },
      {
        intro: '测试8',
        url: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/awardImage/lianxutianshu-pt-dianliang-xiao_1.png',
        id: 7
      },
      {
        intro: '测试9',
        url: 'cloud://cloud1-4gwqhiyk93044a46.636c-cloud1-4gwqhiyk93044a46-1305859258/garbageImageSource/awardImage/lianxutianshu-pt-dianliang-xiao.png',
        id: 8
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    // 获得用户信息
    try {
      const userInfo = wx.getStorageSync('userInfoStorage')
      // 获得图片缓存
      try {
        const awardImage = wx.getStorageSync('awardImage')
        // console.log(awardImage)
        // 如果缓存没有图片
        if (awardImage.length == 0) {
          const downloadList = []
          this.data.awardData.forEach((e) => {
            downloadList.push(e.url)
            // console.log(downloadList)
          });
          // 获取临时链接
          wx.cloud.getTempFileURL({
            fileList: downloadList,
            success: (res) => {
              // console.log(res)
              const fileUrl = res.fileList
              // 设置成就图片缓存数组
              const awardImageFilePath = []
              // 循环开始下载
              fileUrl.forEach((e, index) => {
                // 下载图片
                wx.downloadFile({
                  url: e.tempFileURL,
                  success: (data) => {
                    // console.log(data)
                    if (data.statusCode === 200) {
                      console.log('图片下载成功: ' + data.tempFilePath)
                      // 获取到全局唯一的文件管理器
                      const fs = wx.getFileSystemManager()
                      fs.saveFile({
                        tempFilePath: data.tempFilePath, // 传入一个临时文件路径
                        success(res) {
                          console.log('图片缓存成功', res.savedFilePath) // res.savedFilePath 为一个本地缓存文件路径  
                          awardImageFilePath.push(res.savedFilePath)
                          console.log(awardImageFilePath)
                          wx.setStorageSync('awardImage', awardImageFilePath)
                          that.setData({
                            awardImage: awardImageFilePath
                          })
                        }
                      })
                    }
                  },
                  fail: (err) => {
                    console.error("下载失败：", err)
                  }
                })
              })
            },
            fail: (err) => {
              console.error("获取临时链接失败：", err)
            }
          })
        } else {
          console.log("图片缓存为：", awardImage)
          this.setData({
            awardImage: awardImage
          })
        }
      } catch (error) {
        console.log("图片缓存获取失败:", error)
      }
      console.log(userInfo)
      this.setData({
        userInfo: userInfo
      })
    } catch (error) {
      console.log("用户信息获取失败:", error)
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