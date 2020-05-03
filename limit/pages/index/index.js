//index.js
//获取应用实例
Page({
  data: {
    // 字数限制
    current: 0,
    max: 300,
    imgs: []
  },
  // 文本框字数限制
  limit: function(e) {
    var value = e.detail.value;
    var length = parseInt(value.length);
    if (length > this.data.noteMaxLen) {
      return;
    }
    //获取输入的长度
    this.setData({
      current: length
    });
  },

  // 上传图片
  chooseImg: function(e) {
    var _this = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });

      setTimeout(function() {
        _this.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = _this.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            _this.setData({
              imgs: imgs,
              count: count++
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        _this.setData({
          imgs: imgs
        });
      }
    });
  },
  　
  // 删除图片
  deleteImg: function(e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs,
    });
  },
  // 预览图片
  previewImg: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  }
})