// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js'
import request from '../../../utils/request'
Page({
    data: {
      day: '',
      month: '',
      recommendSongList: [],
      songId:'',
      index:0
    },

    onLoad: function (options) {
      let userInfo = wx.getStorageSync('userInfo')
      if(!userInfo) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          success: () => {
            wx.reLaunch({url:'/pages/login/login'})
          }
        })
      } else {
        this.getRecommendData()
        PubSub.subscribe('switchType',(_,type) => {
          let {recommendSongList, index} = this.data
          if(type === 'pre') {
            if(index === 0) {
              index = recommendSongList.length
            }
            index -= 1
          } else {
            if(index === recommendSongList.length - 1) {
              index = 0
            } else {
              index += 1
            }
          }
          this.setData({index})
          let songId = recommendSongList[index].id
          PubSub.publish('songId',songId)
        })
      }
      this.setData({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1
      });
    },

    async getRecommendData() {
      let recommendListData = await request('/recommend/songs')
      this.setData({
        recommendSongList:recommendListData.recommend
      })
    },

    async toSongDetail(e) {
      let {songid, index} = e.currentTarget.dataset
      this.setData({index})
      wx.navigateTo({url:'/songPackage/pages/songDetail/songDetail?songId='+songid})
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