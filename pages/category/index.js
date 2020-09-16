import { request } from '../../request/index'
// pages/category/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    detailList: [],
    count: 0,
  },
  //  点击变色并更换列表区
  changeColor(e) {
    const data = [...this.data.categoryList]
    data.forEach((item) => {
      if (item.id === e.currentTarget.dataset.id) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    this.setData({ categoryList: data })
    this.getDetail()
  },
  //  获取分类列表
  getCategory() {
    request({
      url: '/user/category',
      method: 'POST',
    }).then((value) => {
      const categoryList = [...value.data.data]

      categoryList[0].isActive = 'true'
      this.setData({ categoryList })
      wx.setStorageSync('category_categoryList', {
        time: Date.now(),
        data: categoryList,
      })
    })
  },
  //  获取详细分类
  getDetail() {
    request({
      url: '/user/category/detail',
      method: 'POST',
    }).then((value) => {
      const detailList = [...value.data.data]
      this.setData({ detailList, count: 0 })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const categoryList = wx.getStorageSync('category_categoryList')
    if (categoryList && Date.now() - categoryList.time < 1000 * 300) {
      this.setData({
        categoryList: categoryList.data,
      })
    } else {
      this.getCategory()
    }

    this.getDetail()
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
