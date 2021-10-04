// pages/personal/personal.js
import request from '../../utils/request'
let startY = 0
let moveY = 0
let moveDistance = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coverTransition: '',
    userInfo: {},
    recentPlayList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo') || null
    userInfo = JSON.parse(decodeURIComponent(userInfo))
    if(userInfo) {
      this.setData({userInfo})
      this.getUserRecentPlayList(this.data.userInfo.userId)
    }
  },

  async getUserRecentPlayList(userId) {
    let recentPlayListData = await request('/user/record',{uid:userId, type:0})
    let index = 0
    let recentPlayList = recentPlayListData.allData.splice(0,10).map(item=>{
      item.id = index++
      return item
    })
    this.setData({recentPlayList})
  },

  handleTouchStart(e) {
    startY = e.touches[0].clientY
    this.setData({coverTransition:''})
  },

  handleTouchMove(e) {
    moveY = e.touches[0].clientY
    moveDistance = moveY - startY
    if(moveDistance > 0 && moveDistance <= 80) {
      this.setData({coverTransform:`translateY(${moveDistance}rpx)`})
    }
  },

  handleTouchEnd(e) {
    this.setData({
      coverTransform:`translateY(0)`,
      coverTransition: 'transform .3s linear'
    })
  },

  toLogin() {
    if(!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})