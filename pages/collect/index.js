// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        name: '商品收藏',
        id: 1,
        isActive: true,
      },
      {
        name: '品牌收藏',
        id: 2,
      },
      {
        name: '店铺收藏',
        id: 3,
      },
      {
        name: '浏览足迹',
        id: 4,
      },
    ],
    collect: [],
  },
  //  点击切换状态
  itemchange(e) {
    let { tabList } = this.data
    tabList.forEach((item) =>
      item.id === e.detail ? (item.isActive = true) : (item.isActive = false)
    )
    this.setData({ tabList })
  },
  //  获取收藏数据
  getCollect() {
    const collect = wx.getStorageSync('collect').data || []
    this.setData({ collect })
  },
  //  跳转详情页
  goToDetail() {
    wx.navigateTo({
      url: '/pages/goods_detail/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCollect()
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
