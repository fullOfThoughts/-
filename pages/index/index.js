import { request } from '../../request/index'
//Page Object
Page({
  data: {
    imgList: [],
    floorList: [],
  },
  //  获取轮播图数据
  getSwiper() {
    request({
      url: '/user/swiper',
      method: 'POST',
    }).then(
      (value) => {
        this.setData({ imgList: value.data.data })
        wx.setStorageSync('index_swiper', {
          time: Date.now(),
          data: value.data.data,
        })
      },
      (reason) => console.log(reason)
    )
  },
  //  获取楼层数据
  getFloor() {
    request({
      url: '/user/floor',
      method: 'POST',
    }).then((value) => {
      this.setData({ floorList: value.data.data })
      wx.setStorageSync('index_floor', {
        time: Date.now(),
        data: value.data.data,
      })
    })
  },
  //options(Object)
  onLoad: function (options) {
    const imgList = wx.getStorageSync('index_swiper')
    const floorList = wx.getStorageSync('index_floor')
    if (imgList && Date.now() - imgList.time < 1000 * 300) {
      this.setData({ imgList: imgList.data })
    } else {
      this.getSwiper()
    }
    if (floorList && Date.now() - floorList.time < 1000 * 300) {
      this.setData({ floorList: floorList.data })
    } else {
      this.getFloor()
    }
  },

  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
})
