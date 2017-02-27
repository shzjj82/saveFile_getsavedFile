//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tempFilePaths: '',
    isAct: false,
    isSava: false,

  },
  onLoad: function () {
  },
  chooseimage: function () {
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        this.saveFile(res);
        // _this.setData({  
        //   tempFilePaths:res.tempFilePaths  
        // })  
      }.bind(this)
    })

  },
  saveFile: function (res) {
    var tempFilePath = res.tempFilePaths[0];
    wx.saveFile({
      tempFilePath: tempFilePath,
      success: function (ress) {
        var savedFilePath = ress.savedFilePath;
        this.data.isAct = true;
        this.data.isSava = true;
        this.getsavedFile();
      }.bind(this)
    })
  },
  getsavedFile: function () {
    if (this.data.isAct) {
      this.data.isAct = false;
      wx.getSavedFileList({
        success: function (res) {
          console.log(res);
          var res_fileList = res.fileList;

          function compare(property) {
            return function (a, b) {
              var value1 = a[property];
              var value2 = b[property];
              return value1 - value2;
            }
          }
          res_fileList.sort(compare('createTime'));
          this.setData({
            tempFilePaths: res_fileList[res_fileList.length - 1].filePath
          })
          if (res.fileList.length > 1) {
            console.log(res.fileList.length)
            // this.removesaved(res);
            console.log(res.fileList.length)
          }
        }.bind(this)
      })
    }
  },
  removesaved: function (res) {
    wx.removeSavedFile({
      filePath: res.fileList[0].filePath,
    })    
  }
})  