import { request } from '../../request/index'
// pages/goods_detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {},
    isCollect: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  //  初始化页面数据以及是否被收藏
  initCollect() {
    request({ url: '/user/goods/detail', method: 'POST' }).then((value) => {
      let goodsData = value.data.data
      let collect = wx.getStorageSync('collect').data
      let boo = collect.some((item) => item.number === goodsData.number)
      if (boo) {
        return this.setData({ goodsData: value.data.data, isCollect: true })
      }
      this.setData({ goodsData: value.data.data })
    })
  },
  //  添加收藏
  collect() {
    this.setData({ isCollect: !this.data.isCollect })
    let { goodsData } = this.data
    goodsData.isCollect = this.data.isCollect
    this.setData({ goodsData })
    if (this.data.isCollect) {
      let collect = wx.getStorageSync('collect')
      if (collect) {
        collect = collect.data.concat(this.data.goodsData)
        wx.setStorageSync('collect', { time: Date.now(), data: collect })
      } else {
        let collect = []
        collect = collect.concat(this.data.goodsData)
        wx.setStorageSync('collect', { time: Date.now(), data: collect })
      }
    } else {
      let collect = wx.getStorageSync('collect').data
      collect = collect.reduce((pre, cur) => {
        if (cur.number === this.data.goodsData.number) {
          return pre
        }
        return pre.concat(cur)
      }, [])
      wx.setStorageSync('collect', { time: Date.now(), data: collect })
    }
  },
  //  预览图片
  preview(e) {
    const arr = Object.values(this.data.goodsData.imgs)

    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: arr,
    })
  },
  //  跳转购物车
  shopping() {
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  //  点击加入购物车
  addCart() {
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1000,
      mask: true,
    })
    let cart = wx.getStorageSync('cart')
    //  判断cart的几种情况
    if (cart) {
      // cart = cart.data.map((item) => {
      //   if (item.number === this.data.goodsData.number) {
      //     item.count++

      //     return item
      //   } else {
      //     return item
      //   }
      // })
      // const boolean = cart.some(
      //   (item) => item.number === this.data.goodsData.number
      // )
      // if (!boolean) {
      //   let { goodsData } = this.data
      //   goodsData.count = 1
      //   cart.push(goodsData)
      // }
      const boolean = cart.data.findIndex(
        (item) => item.number === this.data.goodsData.number
      )
      if (boolean === -1) {
        let { goodsData } = this.data
        goodsData.count = 1
        goodsData.isChecked = true
        cart.data.push(goodsData)
        cart = cart.data
      } else {
        cart.data[boolean].count++
        cart = cart.data
      }
      wx.setStorageSync('cart', { time: Date.now(), data: cart })
    } else {
      //  初始化购物车
      let arr = []
      let { goodsData } = this.data
      goodsData.count = 1
      goodsData.isChecked = true
      arr.push(goodsData)
      wx.setStorageSync('cart', { time: Date.now(), data: arr })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initCollect()
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
