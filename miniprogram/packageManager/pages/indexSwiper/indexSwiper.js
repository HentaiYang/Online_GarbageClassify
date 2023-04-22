// packageManager/pages/indexSwiper/indexSwiper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    uploading: false,
    checkboxResult: []
  },



  // 上传完成获得临时文件地址
  afterRead(event) {
    const {
      file
    } = event.detail;
    const {
      fileList = []
    } = this.data;
    for (let i = 0; i < file.length; i++) {
      fileList.push(file[i])
    }
    this.setData({
      fileList
    });
    console.log(file);
  },
  // 返回时间戳为临时文件名
  returnTimeAsFile() {
    let name = new Date().getTime()
    return name
  },

  // 上传图片
  uploadToCloud() {
    wx.cloud.init();
    const {
      fileList
    } = this.data;
    if (!fileList.length) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none'
      });
    } else {
      const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({
            title: '上传成功',
            icon: 'none'
          });
          const newFileList = data.map(item => ({
            url: item.fileID
          }));
          this.setData({
            cloudPath: data,
            fileList: newFileList
          });
        })
        .catch(e => {
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          });
          console.log(e);
        });
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },
  // 点击删除按钮
  deleteImage(event) {
    console.log(event.detail.index);
    const {
      fileList
    } = this.data;
    fileList.splice(event.detail.index, 1)
    this.setData({
      fileList
    })
  },
  checkboxOnChange(event) {
    console.log(event);
    this.setData({
      checkboxResult: event.detail,
    });
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