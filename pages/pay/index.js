// pages/pay/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    detailAddress: '',
    cart: [],
    allPrice: 0,
    allCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress()
  },
  //  获取收货地址、购物车信息、商品总价格、总数量
  getAddress() {
    const address = wx.getStorageSync('address').data
    let cart = wx.getStorageSync('cart').data
    cart = cart.reduce((pre, cur) => {
      if (cur.isChecked === true) {
        return pre.concat(cur)
      }
      return pre
    }, [])
    const detailAddress =
      address.provinceName +
      address.cityName +
      address.countyName +
      address.detailInfo
    this.setData({ address, cart, detailAddress })
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
  //  检查是否有token
  pay() {
    const token = wx.getStorageSync('token')
    if (!token) {
      return wx.navigateTo({
        url: '/pages/auth/index',
      })
    }
    try {
      //  获取token之后创建订单编号
      const goods = this.data.cart.reduce((pre, cur) => {
        const obj = {
          goods_id: cur.number,
          goods_number: cur.count,
          goods_price: cur.price,
        }
        return pre.concat(obj)
      }, [])
      const header = { Authorization: token }
      const data = {
        order_price: this.data.allPrice,
        consignee_addr: this.data.detailAddress,
        goods,
      }
      // 准备预支付，假设已经获取了订单编号order_number
      const order_number = '3242532kjdshdjskjfc'
      const header2 = { Authorization: token }
      const data2 = { order_number }
      //  支付、查询订单状态、假设流程已经走完，最后try catch一下在跳转
      wx.showToast({
        title: '支付成功',
        mask: true,
        duration: 1500,
        icon: 'success',
        success: () => {
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/order/index',
            })
          }, 1000)
          //  分离已经结算的数据和未结算的数据
          const doneOrder = wx.getStorageSync('doneOrder')
          if (!doneOrder) {
            const { cart } = this.data
            wx.setStorageSync('doneOrder', { time: Date.now(), data: cart })
          } else {
            const { cart } = this.data
            const data = doneOrder.data.concat(cart)
            wx.setStorageSync('doneOrder', {
              time: Date.now(),
              data: data,
            })
          }
          let oldCart = wx.getStorageSync('cart')
          oldCart = oldCart.data.filter((item) => item.isChecked === false)
          wx.setStorageSync('cart', { time: Date.now(), data: oldCart })

          //  在本地
        },
      })
    } catch (err) {
      wx.showToast({
        title: '支付失败',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
      })
    }
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
