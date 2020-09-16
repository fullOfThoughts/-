// pages/user/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collect: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  //  初始化获取用户信息
  getUserInfo() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  //  跳转全部订单
  allOrder(e) {
    const index = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/order/index?type=${index}`,
    })
  },
  //  初始化个人信息
  initUser() {
    const userInfo = wx.getStorageSync('userInfo').data
    if (userInfo) {
      this.setData({ userInfo })
    } else {
      this.setData({ userInfo: {} })
    }

    const collect = wx.getStorageSync('collect').data.length || 0
    this.setData({ collect })
  },
  //  跳转收藏页面
  collect() {
    wx.navigateTo({
      url: '/pages/collect/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initUser()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
