const app = getApp()

const handleLogin = () => {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        resolve(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取 openid 失败，请检查是否有部署 login 云函数',
        })
        console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        reject(err)
      }
    })
  })
}

export default {
  handleLogin
}