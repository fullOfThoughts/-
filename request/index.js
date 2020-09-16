let count = 0
export const request = (params) => {
  count++
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  //  判断是否需要带请求头
  let header = { ...params.header } //  请求头可能需要多个参数
  if (params.url.includes('/my/')) {
    header['Authorization'] = wx.getStorageSync('token') //  为header 添加Authorization属性
  }
  const baseURL = 'http://rap2.taobao.org:38080/app/mock/266370'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header: header,
      url: baseURL + params.url,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        count--
        if (count === 0) {
          wx.hideLoading()
        }
      },
    })
  })
}
