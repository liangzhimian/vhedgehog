const app = getApp()
const db = app.globalData.db
const userInfo = db.collection('userInfo')

import login from '../../utils/login'

Page({
  data: {
    fadeOut: false,
    showLogin: false
  },

  onLoad() {
    // 进入小程序后，自动执行登陆
    login.handleLogin().then(res => {
      // 登陆成功后，查询数据库有没有用户信息
      const self = this

      userInfo.where({
        _openid: res.result.openid
      }).get().then(res => {
        // 有用户数据，直接进入首页
        if (res.data.length) return self.navigateHomePage(res.data[0])

        // 没有用户数据，显示按钮，获取数据
        self.setData({
          showLogin: true
        })

      }).catch(console.error)

    }).catch(console.error)

  },

  // 初次点击进入 
  handleGetUserInfo(e) {
    const self = this
    const data = JSON.parse(e.detail.rawData)

    // 用户数据存入数据库
    userInfo.add({
      data
    }).then(res => {
      self.navigateHomePage({
        openid: app.globalData.openid,
        ...data
      })

    }).catch(console.error)

  },

  navigateHomePage(userInfo) {
    app.globalData.userInfo = userInfo
    this.setData({
      fadeOut: true
    })

    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index',
      })

    }, 800)

  },

})