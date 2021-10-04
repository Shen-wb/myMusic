// pages/songDetail/songDetail.js
import PubSub from 'pubsub-js'
import moment from 'moment'
import request from '../../../utils/request'
const appInstance = getApp()
Page({
    data: {
      isPlay: true,
      songDetail: {},
      songId:'',
      musicLink:'',
      currentTime:'00:00',
      durationTime:'',
      currentWidth: 0
    },

    onLoad(options) {
      let songId = options.songId
      this.getSongDetail(songId)
      this.setData({songId})
      this.musicControl(this.data.isPlay)
      if(appInstance.globalData.isMusicPlay && appInstance.globalData.songId === songId) {
        this.setData({isPlay: true})
      }
      this.backgroundAudioManager = wx.getBackgroundAudioManager()
      this.backgroundAudioManager.onPlay(() => {
        this.changePlayState(true)
        appInstance.globalData.songId = options.songId
      })
      this.backgroundAudioManager.onPause(() => {
        this.changePlayState(false)
      })
      this.backgroundAudioManager.onStop(() => {
        this.changePlayState(false)
      })
      this.backgroundAudioManager.onTimeUpdate(() => {
        let currentTime = moment(this.backgroundAudioManager.currentTime*1000).format('mm:ss')
        let currentWidth = (this.backgroundAudioManager.currentTime *450) / this.backgroundAudioManager.duration
        this.setData({currentTime,currentWidth})
      })
      this.backgroundAudioManager.onEnded(() => {
        PubSub.publish('switchType','next')
        this.setData({
          currentWidth:0,
          currentTime:'00:00'
        })
      })
    },

    changePlayState(isPlay) {
      this.setData({isPlay})
      appInstance.globalData.isMusicPlay = isPlay
    },

    async getSongDetail(songId) {
      let songDetailData = await request('/song/detail',{ids:songId})
      let durationTime = moment(songDetailData.songs[0].dt).format('mm:ss')
      this.setData({
        songDetail: songDetailData.songs[0],
        durationTime
      })
      this.set
      wx.setNavigationBarTitle({
        title: this.data.songDetail.name
      })
    },

    handleMusicPlay() {
      let isPlay = !this.data.isPlay
      this.setData({isPlay});
      this.musicControl(isPlay,this.data.musicLink)
    },

    async musicControl(isPlay, musicLink) {
      if(isPlay) {
        if(!musicLink) {
          let musicLinkData = await request('/song/url',{id:this.data.songId})
          let musicLink = musicLinkData.data[0].url
          this.setData({musicLink})
        }
        this.backgroundAudioManager.src = this.data.musicLink
        this.backgroundAudioManager.title = this.data.songDetail.name
      } else {
        this.backgroundAudioManager.pause()
      }
    },

    handleSwitch(e) {
      let type = e.currentTarget.id
      this.backgroundAudioManager.stop()
      PubSub.subscribe('songId',(_,songId) => {
        this.setData({songId})
        this.getSongDetail(songId)
        this.musicControl(true)
        PubSub.unsubscribe('songId')
      })
      PubSub.publish('switchType',type)
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