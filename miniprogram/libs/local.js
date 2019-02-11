const keys = {
  "openID": "openID",
  "userInfo": "User_Info"
}

const local = {
  get: key => {
    return wx.getStorageSync(keys[key]) || null
  },

  set: function(key, value, sync = true) {
    sync ? wx.setStorageSync(keys[key], value) :
      wx.setStorage({
        key: keys[key],
        data: value
      })
  },

  clear: (key, sync = true) => {
    sync ? wx.removeStorageSync(keys[key]) :
      wx.removeStorage({
        key: keys[key]
      })
  }
}

module.exports = local