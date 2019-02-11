//app.js
App({
  onLaunch: function () {
    const data = {}
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'vhedgehog-39b3f1',
        traceUser: true,
      })

      data.db = wx.cloud.database()
    }

    this.globalData = {
      ...data
    }
  }
})
