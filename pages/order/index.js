import { request } from '../../request/index'
// pages/order/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        name: '全部',
        id: 1,
        isActive: true,
      },
      {
        name: '代付款',
        id: 2,
      },
      {
        name: '代发货',
        id: 3,
      },
      {
        name: '退货/退款',
        id: 4,
      },
    ],
    type: 1,
    data: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  //  切换状态
  itemchange(e) {
    const index = e.detail
    let { tabList } = this.data
    tabList.forEach((item) =>
      item.id === index ? (item.isActive = true) : (item.isActive = false)
    )
    this.setData({ tabList, type: index })
    request({ url: '/user/order', method: 'POST', data: { type: index } }).then(
      (value) => {
        let { data } = value.data
        data.forEach(
          (item) => (item.createAt = new Date(item.createAt).toLocaleString())
        )
        this.setData({ data })
      }
    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let currentPages = getCurrentPages()
    const index = currentPages[currentPages.length - 1].options.type * 1
    this.setData({ type: index })
    let { tabList } = this.data
    tabList.forEach((item) =>
      item.id === index ? (item.isActive = true) : (item.isActive = false)
    )
    this.setData({ tabList })
    request({ url: '/user/order', method: 'POST', data: { type: index } }).then(
      (value) => {
        let { data } = value.data
        data.forEach(
          (item) => (item.createAt = new Date(item.createAt).toLocaleString())
        )
        this.setData({ data })
      }
    )
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
