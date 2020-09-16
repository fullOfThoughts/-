// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    isAll: false,
    allPrice: 0,
    allCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  //  获取地址
  getAddress() {
    wx.getSetting({
      success: (result) => {
        if (
          result.authSetting['scope.address'] === undefined ||
          result.authSetting['scope.address'] === true
        ) {
          wx.chooseAddress({
            success: (result) => {
              this.setData({ address: result })
              wx.setStorageSync('address', {
                time: Date.now(),
                data: result,
              })
            },
          })
        } else {
          wx.openSetting({})
        }
      },
    })
  },
  //  初始化地址
  initAddress() {
    const address = wx.getStorageSync('address')
    if (address) {
      this.setData({ address: address.data })
    } else {
      this.setData({ address: {} })
    }
  },
  //  初始化购物车
  initCart() {
    const cart = wx.getStorageSync('cart')
    if (cart) {
      this.setData({
        cart: cart.data,
      })
    } else {
      this.setData({
        cart: [],
      })
    }
  },

  //  点击复选框
  changeScope(e) {
    let { cart } = this.data
    cart.forEach((item) => {
      if (item.number === e.currentTarget.dataset.id) {
        item.isChecked = !item.isChecked
      }
      return item
    })
    this.setData({ cart })
    wx.setStorageSync('cart', { time: Date.now(), data: cart })

    this.composite()
  },

  //  计算商品总价格、总数量、是否全部选中
  composite() {
    //  是否全部选中
    const { cart } = this.data
    if (cart.length === 0) {
      this.setData({ isAll: false })
    } else {
      const boolean = cart.every((item) => item.isChecked === true)
      if (boolean === true) {
        this.setData({ isAll: true })
      } else {
        this.setData({ isAll: false })
      }
    }
    //  商品总价格

    const allPrice = cart.reduce((pre, cur) => {
      if (cur.isChecked) {
        return pre + cur.price * cur.count
      }
      return pre
    }, 0)
    this.setData({ allPrice })
    //  结算商品总数量

    const allCount = cart.reduce((pre, cur) => {
      if (cur.isChecked) {
        return pre + cur.count
      }
      return pre
    }, 0)
    this.setData({ allCount })
  },
  //  取消全部选中
  cancelAll(e) {
    let { cart } = this.data
    if (e.detail.value.length === 0) {
      cart.forEach((item) => (item.isChecked = false))
    } else {
      cart.forEach((item) => (item.isChecked = true))
    }
    this.setData({ cart })
    wx.setStorageSync('cart', { time: Date.now(), data: cart })
    this.composite()
  },
  //  增加数量
  incCount(e) {
    let { cart } = this.data
    cart.forEach((item) => {
      if (item.number === e.currentTarget.dataset.id) {
        item.count++
      }
      return item
    })
    this.setData({ cart })
    wx.setStorageSync('cart', { time: Date.now(), data: cart })
    this.composite()
  },
  //  减少数量
  decCount(e) {
    let { cart } = this.data
    let i = -1
    const that = this
    cart.forEach((item, index) => {
      if (item.number === e.currentTarget.dataset.id) {
        item.count > 1 ? item.count-- : (i = index)
      }
      return item
    })
    if (i === -1) {
      this.setData({ cart })
      wx.setStorageSync('cart', { time: Date.now(), data: cart })
      this.composite()
    } else {
      wx.showModal({
        title: '确定删除？',
        confirmText: '删除',
        confirmColor: '#ff0000',
        success(res) {
          if (res.confirm) {
            cart.splice(i, 1)
            that.setData({ cart })
            wx.setStorageSync('cart', { time: Date.now(), data: cart })
            that.composite()
          } else if (res.cancel) {
          }
        },
      })
    }
  },
  //  结算
  clearing() {
    const address = wx.getStorageSync('address').data
    const cart = wx.getStorageSync('cart').data

    if (address === undefined) {
      return wx.showToast({
        title: '还没有填写地址',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
    }
    if (this.data.allCount === 0) {
      return wx.showToast({
        title: '还没有选购商品',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
    }
    wx.navigateTo({
      url: '/pages/pay/index',
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
    this.initAddress()
    this.initCart()
    this.composite()
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
