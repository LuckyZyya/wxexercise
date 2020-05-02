//index.js
//获取应用实例
Page({
  data: {
    // 字数限制
    current: 0,
    max: 300,
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
})