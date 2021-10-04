// pages/search/search'.js
import request from '../../utils/request'
let isSend = false
Page({
    data: {
      placeholderContent: '',
      hotList: [],
      searchContent: '',
      searchList: [],
      historyList: []
    },

    onLoad: function (options) {
      this.getPlaceholder()
      this.getSearchHistory()
    },

    async getPlaceholder() {
      let placeholderData = await request('/search/default')
      let hotListData = await request('/search/hot/detail')
      this.setData({
        placeholderContent:placeholderData.data.realkeyword,
        hotList:hotListData.data
      })
      
    },

    getSearchHistory() {
      let historyList = wx.getStorageSync('searchHistory')
      if(historyList) {
        this.setData({historyList})
      }
    },

    handleInputChange(e) {
      this.setData({searchContent:e.detail.value.trim()})
      if(isSend) {
        return
      } 
      isSend = true
      setTimeout(async ()=>{
        if(this.data.searchContent) {
          let searchListData = await request(`/search?keywords=${this.data.searchContent}&limit=10`)
          this.setData({searchList: searchListData.result.songs})
          let historyList = this.data.historyList
          if(historyList.indexOf(this.data.searchContent) !== -1) {
            historyList.splice(historyList.indexOf(this.data.searchContent),1)
          }
          historyList.unshift(this.data.searchContent)
          this.setData({historyList}) 
          wx.setStorageSync('searchHistory',historyList)
        } else {
          this.setData({searchList:[]})
        }
        isSend = false
      },300)
    },

    clearSearchContent() {
      this.setData({searchContent:'',searchList:[]})
    },

    deleteHistory() {
      if(this.data.historyList.length > 0) {
        wx.showModal({
          title: '提示',
          content: "确认删除所有历史记录吗？",
          success: (res) => {
            if(res.confirm) {
              wx.showToast({
                title:'删除成功！',
              }) 
              console.log();
              this.setData({historyList:[]})
              wx.removeStorageSync('searchHistory')
            }
          }
        })
      } else {
        wx.showToast({
          title:'暂无历史记录',
          icon:'none'
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