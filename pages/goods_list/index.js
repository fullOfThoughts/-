import { request } from '../../request/index'
// pages/goods_list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        name: '综合',
        id: 1,
        isActive: true,
      },
      {
        name: '销量',
        id: 2,
      },
      {
        name: '价格',
        id: 3,
      },
    ],
    index: 1,
    goodsList: [],
    count: 0,
  },
  switchItem(e) {
    const tabList = [...this.data.tabList]
    tabList.forEach((item) =>
      item.id === e.detail ? (item.isActive = true) : (item.isActive = false)
    )
    this.setData({
      tabList,
      index: e.detail,
    })
  },
  //  动态加载数据
  loadList() {
    if (this.data.count < 2) {
      request({ url: '/user/goods', method: 'POST' }).then((value) => {
        const arr = value.data.data
        const aee = [...this.data.goodsList]
        const newArr = aee.concat(arr)
        const la = this.data.count + 1
        this.setData({ goodsList: newArr, count: la })
      })
    } else {
      wx.showToast({
        title: '没有数据了',
        icon: 'none',
      })
    }
  },
  //  获取商品列表
  getGoods() {
    request({ url: '/user/goods', method: 'POST' }).then((value) => {
      this.setData({ goodsList: value.data.data })
      // wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onReachBottom: function () {
    this.loadList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
