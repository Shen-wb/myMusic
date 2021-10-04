// pages/video/video.js
import request from '../../utils/request'
let ToLowerCount = 0
Page({
  data: {
    videoGroupList: [],
    navId:'',
    videoList: [],
    videoId: '',
    videoUpdateTime: [],
    isTriggered: false
  },

  onLoad: function (options) {
    this.getVideoGroupList()
  },

  async getVideoGroupList() {
    let VideoGroupListData = await request('/video/group/list')
    this.setData({
      videoGroupList:VideoGroupListData.data.slice(0,12),
      navId:VideoGroupListData.data[0].id
    })
    this.getVideoList(this.data.navId)
  },

  async getVideoList(navId) {
    let videoListData = await request('/video/group', {id:navId});
    wx.hideLoading()
    let index = 0
    let videoList = videoListData.datas ? videoListData.datas.map(item => {
      item.id = index++
      return item
    }) : ''
    this.setData({videoList,isTriggered:false})
  },

  changeNav(e) {
    let navId = e.currentTarget.id
    this.setData({navId:navId*1})
    this.setData({videoList:[]})
    wx.showLoading({title: '正在加载'})
    this.getVideoList(this.data.navId)
    this.setData({videoId:''})
  },

  handlePlay(e) {
    let vid = e.currentTarget.id
    /* if(this.videoContext && this.vid !== vid) {
      this.videoContext.stop()
    }
    this.vid = vid */
    this.setData({videoId:vid})
    let {videoUpdateTime} = this.data
    this.videoContext = wx.createVideoContext(vid)
    let videoItem = videoUpdateTime.find(item => item.vid === vid)
    if(videoItem) {
      this.videoContext.seek(videoItem.currentTime)
    } else {
      this.videoContext.play()
    }
  },

  handleTimeUpdate(e) {
    let videoTimeObj = {vid:e.currentTarget.id, currentTime:e.detail.currentTime}
    let {videoUpdateTime} = this.data
    let videoItem = videoUpdateTime.find(item=>item.vid === videoTimeObj.vid)
    if(videoItem) {
      videoItem.currentTime = videoTimeObj.currentTime
    } else {
      videoUpdateTime.push(videoTimeObj)
    }
    this.setData({videoUpdateTime})
  },

  handleEnded(e) {
    let {videoUpdateTime} = this.data
    let index = videoUpdateTime.findIndex(item => item.vid === e.currentTarget.id)
    videoUpdateTime.splice(index, 1)
    this.setData({videoUpdateTime})
  },

  handleRefresher() {
    this.getVideoList(this.data.navId)
  },
  
  handleToLower() {
    ToLowerCount++
    if(ToLowerCount <= 3) {
      let newVideoList = [
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_6BE569C4B915816F256F7E5E311A2A0D",
                "coverUrl": "https://p1.music.126.net/CYx1JIOSqJliwuBTnTvumg==/109951163574122384.jpg",
                "height": 720,
                "width": 1280,
                "title": "Trouble Maker在音乐中心带来《没有明天》",
                "description": "草马组合，绝对让你移不开眼",
                "commentCount": 121,
                "shareCount": 305,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 40448433
                    },
                    {
                        "resolution": 480,
                        "size": 71744482
                    },
                    {
                        "resolution": 720,
                        "size": 87596109
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 110000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/BxTgxRp7hNOmgyYwaASXLA==/109951163422724337.jpg",
                    "accountStatus": 0,
                    "gender": 2,
                    "city": 110101,
                    "birthday": 844099200000,
                    "userId": 1332575517,
                    "userType": 0,
                    "nickname": "琳琳请多指教",
                    "signature": "多喝热水，早点休息",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951163422724340,
                    "backgroundImgId": 109951163241981950,
                    "backgroundUrl": "http://p1.music.126.net/SlamZ347eh-lQJrzk3ipJw==/109951163241981959.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "音乐视频达人"
                    },
                    "djStatus": 0,
                    "vipType": 0,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951163241981959",
                    "avatarImgIdStr": "109951163422724337"
                },
                "urlInfo": {
                    "id": "6BE569C4B915816F256F7E5E311A2A0D",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/0bLm54kD_1859570914_shd.mp4?ts=1632652536&rid=C439EA7D41510F3930FF2FB6DBC3C7BD&rl=3&rs=kRwjGreTyhwVGHRPTUwadDeoiAhRDySR&sign=647b28bfbe582384514b72ec6c11166b&ext=FYXRvcPuMXqg%2F0MDowd1uUO%2Fw5aMNN3TRKv00BZ4sJgv4CejXouZqmezPRzJp5HVuIrJoJv6sam%2FZRTacZbG4nA37uqeJrpd4t2iJrOsn4oMXrz8660jeJNo%2FkklMgRe9T6PLvvcb8ZaUVwfTZu11X5COMyciBM9ggmWJFwcTYgY5hmRNEHe7tNDwdW5%2BkJmwUdyg8hPJxSQQad4Fy5aj101jZ6%2FWYHAW88qKvLIeH7KdYyDohsP1NjcMbAxPj8T",
                    "size": 87596109,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 720
                },
                "videoGroup": [
                    {
                        "id": 58100,
                        "name": "现场",
                        "alg": null
                    },
                    {
                        "id": 57107,
                        "name": "韩语现场",
                        "alg": null
                    },
                    {
                        "id": 57108,
                        "name": "流行现场",
                        "alg": null
                    },
                    {
                        "id": 1100,
                        "name": "音乐现场",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "내일은 없어",
                        "id": 27896639,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 161330,
                                "name": "Trouble Maker",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": "",
                        "fee": 8,
                        "v": 45,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 2692032,
                            "name": "Chemistry",
                            "picUrl": "http://p3.music.126.net/REo7CyUVpiWIU02OMNjaMw==/5509652766915088.jpg",
                            "tns": [],
                            "pic": 5509652766915088
                        },
                        "dt": 218619,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 8747929,
                            "vd": -70797
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 5248775,
                            "vd": -68247
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3499198,
                            "vd": -66669
                        },
                        "a": null,
                        "cd": "1",
                        "no": 2,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 1415873,
                        "mv": 195007,
                        "publishTime": 1382889600007,
                        "tns": [
                            "没有明天"
                        ],
                        "privilege": {
                            "id": 27896639,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "6BE569C4B915816F256F7E5E311A2A0D",
                "durationms": 218337,
                "playTime": 631813,
                "praisedCount": 3298,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_B02BFB5C710D28C12D8440F6195697F9",
                "coverUrl": "https://p1.music.126.net/6r14QftRCvVc6Vvv1Pi6eA==/109951165363332805.jpg",
                "height": 720,
                "width": 1280,
                "title": "Lana Del Rey - Summertime Sadness Live",
                "description": "",
                "commentCount": 161,
                "shareCount": 460,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 31643357
                    },
                    {
                        "resolution": 480,
                        "size": 53216503
                    },
                    {
                        "resolution": 720,
                        "size": 76187113
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 220000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/D5I5_l35AiaqRmWmesgtBA==/109951164076487279.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 220100,
                    "birthday": 626112000000,
                    "userId": 353778198,
                    "userType": 204,
                    "nickname": "ALONEWALK-CMON",
                    "signature": "已经没有退路可言了，后退即万丈深渊，只能前进过荆棘！",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951164076487280,
                    "backgroundImgId": 109951164076469550,
                    "backgroundUrl": "http://p1.music.126.net/HC-z-C2VKmAXGPJFqXfIMg==/109951164076469554.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": null,
                    "djStatus": 0,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951164076469554",
                    "avatarImgIdStr": "109951164076487279"
                },
                "urlInfo": {
                    "id": "B02BFB5C710D28C12D8440F6195697F9",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/T1togSgM_1498175464_shd.mp4?ts=1632652536&rid=C439EA7D41510F3930FF2FB6DBC3C7BD&rl=3&rs=oegvQmHbapkyuWbsRkgxGQMzPxkftHIo&sign=b46e16604c53dbd81ee6d4b7860bd6cd&ext=FYXRvcPuMXqg%2F0MDowd1uUO%2Fw5aMNN3TRKv00BZ4sJgv4CejXouZqmezPRzJp5HVuIrJoJv6sam%2FZRTacZbG4nA37uqeJrpd4t2iJrOsn4oMXrz8660jeJNo%2FkklMgRe9T6PLvvcb8ZaUVwfTZu11X5COMyciBM9ggmWJFwcTYgY5hmRNEHe7tNDwdW5%2BkJmwUdyg8hPJxSQQad4Fy5aj101jZ6%2FWYHAW88qKvLIeH7KdYyDohsP1NjcMbAxPj8T",
                    "size": 76187113,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 720
                },
                "videoGroup": [
                    {
                        "id": 58100,
                        "name": "现场",
                        "alg": null
                    },
                    {
                        "id": 57106,
                        "name": "欧美现场",
                        "alg": null
                    },
                    {
                        "id": 57110,
                        "name": "饭拍现场",
                        "alg": null
                    },
                    {
                        "id": 1100,
                        "name": "音乐现场",
                        "alg": null
                    },
                    {
                        "id": 12100,
                        "name": "流行",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 14242,
                        "name": "伤感",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "B02BFB5C710D28C12D8440F6195697F9",
                "durationms": 237656,
                "playTime": 133378,
                "praisedCount": 1191,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_2283A4072180115D69C040FD1F7D2A8F",
                "coverUrl": "https://p1.music.126.net/9SslJiklCv2RPj-LBV-ClA==/109951163573481773.jpg",
                "height": 1080,
                "width": 1920,
                "title": "萨克斯与极致美声—安德烈波切利&肯尼基《A Te》",
                "description": "安德烈波切利和肯尼基在安德烈波切利意大利托斯卡纳演唱会上的精彩演绎 -《A Te》",
                "commentCount": 195,
                "shareCount": 2510,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 30586148
                    },
                    {
                        "resolution": 480,
                        "size": 50111487
                    },
                    {
                        "resolution": 720,
                        "size": 72731015
                    },
                    {
                        "resolution": 1080,
                        "size": 125154836
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 140000,
                    "authStatus": 1,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/lb__xVEo9_hVJmtgymErRg==/109951163339500881.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 140300,
                    "birthday": 739209600000,
                    "userId": 47959220,
                    "userType": 4,
                    "nickname": "阳泉萨克斯工作室",
                    "signature": "中国萨克斯学会会员、 中央音乐学院认证萨克斯教师、 阳泉市城区音乐家协会理事",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951163339500880,
                    "backgroundImgId": 109951162911788930,
                    "backgroundUrl": "http://p1.music.126.net/2WyYqIZJW7mKFU2jXyWOLw==/109951162911788931.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "音乐原创视频达人"
                    },
                    "djStatus": 10,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951162911788931",
                    "avatarImgIdStr": "109951163339500881"
                },
                "urlInfo": {
                    "id": "2283A4072180115D69C040FD1F7D2A8F",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/vtbpsLQF_1575261369_uhd.mp4?ts=1632652536&rid=C439EA7D41510F3930FF2FB6DBC3C7BD&rl=3&rs=ojjbWVodavDlwyhokIFxZzzhQHjELDob&sign=b6d0a8858d3a8042660b38204b3f4f34&ext=FYXRvcPuMXqg%2F0MDowd1uUO%2Fw5aMNN3TRKv00BZ4sJgv4CejXouZqmezPRzJp5HVuIrJoJv6sam%2FZRTacZbG4nA37uqeJrpd4t2iJrOsn4oMXrz8660jeJNo%2FkklMgRe9T6PLvvcb8ZaUVwfTZu11X5COMyciBM9ggmWJFwcTYgY5hmRNEHe7tNDwdW5%2BkJmwUdyg8hPJxSQQad4Fy5aj101jZ6%2FWYHAW88qKvLIeH7KdYyDohsP1NjcMbAxPj8T",
                    "size": 125154836,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 1080
                },
                "videoGroup": [
                    {
                        "id": 58100,
                        "name": "现场",
                        "alg": null
                    },
                    {
                        "id": 57106,
                        "name": "欧美现场",
                        "alg": null
                    },
                    {
                        "id": 4103,
                        "name": "演奏",
                        "alg": null
                    },
                    {
                        "id": 1100,
                        "name": "音乐现场",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 14245,
                        "name": "萨克斯",
                        "alg": null
                    },
                    {
                        "id": 23128,
                        "name": "纯音乐",
                        "alg": null
                    },
                    {
                        "id": 16201,
                        "name": "温暖",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "A Te",
                        "id": 16323624,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 27597,
                                "name": "Andrea Bocelli",
                                "tns": [],
                                "alias": []
                            },
                            {
                                "id": 37519,
                                "name": "Kenny G",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 60,
                        "st": 0,
                        "rt": "600902000001209988",
                        "fee": 1,
                        "v": 40,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 1505852,
                            "name": "The Best of Andrea Bocelli - 'Vivere'",
                            "picUrl": "http://p4.music.126.net/PFa4MOvDLLJtMy74sBU8yw==/568447511567275.jpg",
                            "tns": [],
                            "pic": 568447511567275
                        },
                        "dt": 248720,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 9951652,
                            "vd": -14326
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 5971009,
                            "vd": -11720
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3980687,
                            "vd": -9972
                        },
                        "a": null,
                        "cd": "1",
                        "no": 6,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 7003,
                        "mv": 0,
                        "publishTime": 1194825600000,
                        "privilege": {
                            "id": 16323624,
                            "fee": 1,
                            "payed": 0,
                            "st": 0,
                            "pl": 0,
                            "dl": 0,
                            "sp": 0,
                            "cp": 0,
                            "subp": 0,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 0,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "2283A4072180115D69C040FD1F7D2A8F",
                "durationms": 300536,
                "playTime": 411082,
                "praisedCount": 2716,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_CCB16EB3BCA3AE1A1B788394096AD835",
                "coverUrl": "https://p1.music.126.net/ZquC6To1luTUva-vTKz6Dw==/109951163572714616.jpg",
                "height": 720,
                "width": 1280,
                "title": "黄龄《痒》 live，声音美，旋律美，歌词更美",
                "description": "黄龄《痒》 live，声音美，旋律美，歌词更美，谁不会喜欢这么魅惑又温柔又拨动心弦的声音~“来啊，快活啊，反正有大把时光”",
                "commentCount": 1649,
                "shareCount": 3333,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 12799755
                    },
                    {
                        "resolution": 480,
                        "size": 18270934
                    },
                    {
                        "resolution": 720,
                        "size": 29321553
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 110000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/4bvJLzf_NsPcf84OcyPlrA==/19085322835187480.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 110101,
                    "birthday": 723139200000,
                    "userId": 546876822,
                    "userType": 0,
                    "nickname": "音悦-留声机",
                    "signature": "新浪微博关注@音悦留声机，留住感动你我的瞬间",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 19085322835187480,
                    "backgroundImgId": 109951164048935180,
                    "backgroundUrl": "http://p1.music.126.net/aPVYpnnPwHhfjx6XCiC6RA==/109951164048935184.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "音乐视频达人"
                    },
                    "djStatus": 0,
                    "vipType": 0,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951164048935184",
                    "avatarImgIdStr": "19085322835187480"
                },
                "urlInfo": {
                    "id": "CCB16EB3BCA3AE1A1B788394096AD835",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/mfLJ6sHB_46669481_shd.mp4?ts=1632652536&rid=C439EA7D41510F3930FF2FB6DBC3C7BD&rl=3&rs=yGZzfeYiKuQZuRzkjeaoVYAcjGMczHTZ&sign=043f8d0b9a0d976d5383f9bcd24e8ef7&ext=FYXRvcPuMXqg%2F0MDowd1uUO%2Fw5aMNN3TRKv00BZ4sJgv4CejXouZqmezPRzJp5HVuIrJoJv6sam%2FZRTacZbG4nA37uqeJrpd4t2iJrOsn4oMXrz8660jeJNo%2FkklMgRe9T6PLvvcb8ZaUVwfTZu11X5COMyciBM9ggmWJFwcTYgY5hmRNEHe7tNDwdW5%2BkJmwUdyg8hPJxSQQad4Fy5aj101jZ6%2FWYHAW88qKvLIeH7KdYyDohsP1NjcMbAxPj8T",
                    "size": 29321553,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 720
                },
                "videoGroup": [
                    {
                        "id": 58100,
                        "name": "现场",
                        "alg": null
                    },
                    {
                        "id": 59101,
                        "name": "华语现场",
                        "alg": null
                    },
                    {
                        "id": 57108,
                        "name": "流行现场",
                        "alg": null
                    },
                    {
                        "id": 1100,
                        "name": "音乐现场",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "CCB16EB3BCA3AE1A1B788394096AD835",
                "durationms": 109901,
                "playTime": 3243854,
                "praisedCount": 15009,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_E0EAE8EEB9FBE1E82F0BCA345BDEEEDE",
                "coverUrl": "https://p1.music.126.net/NHPhl5F4yM7vz_Qe1qT6cQ==/109951165051648257.jpg",
                "height": 720,
                "width": 1280,
                "title": "孙燕姿出道20周年，线上演唱会光脚演唱经典歌曲《逆光》",
                "description": "",
                "commentCount": 62,
                "shareCount": 282,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 18016011
                    },
                    {
                        "resolution": 480,
                        "size": 28655625
                    },
                    {
                        "resolution": 720,
                        "size": 37077010
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 360000,
                    "authStatus": 1,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/6s77fgjRyJbZDD9P4pj7_g==/109951165183794616.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 360100,
                    "birthday": 904706247716,
                    "userId": 613493895,
                    "userType": 204,
                    "nickname": "白袜学长",
                    "signature": "我要悄悄的拔尖，然后惊艳所有人！",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951165183794620,
                    "backgroundImgId": 109951164605250880,
                    "backgroundUrl": "http://p1.music.126.net/4_BCwz2gvuQ9Lot2GL1pbA==/109951164605250885.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "音乐视频达人"
                    },
                    "djStatus": 10,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951164605250885",
                    "avatarImgIdStr": "109951165183794616"
                },
                "urlInfo": {
                    "id": "E0EAE8EEB9FBE1E82F0BCA345BDEEEDE",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/k5KGJDK4_3026964482_shd.mp4?ts=1632652536&rid=C439EA7D41510F3930FF2FB6DBC3C7BD&rl=3&rs=aZCrDvVSBJHuPdXdgyLdJKoPtgdQWPbf&sign=cb2e0091220b64dae77e09ce43b6431d&ext=FYXRvcPuMXqg%2F0MDowd1uUO%2Fw5aMNN3TRKv00BZ4sJgv4CejXouZqmezPRzJp5HVuIrJoJv6sam%2FZRTacZbG4nA37uqeJrpd4t2iJrOsn4oMXrz8660jeJNo%2FkklMgRe9T6PLvvcb8ZaUVwfTZu11X5COMyciBM9ggmWJFwcTYgY5hmRNEHe7tNDwdW5%2BkJmwUdyg8hPJxSQQad4Fy5aj101jZ6%2FWYHAW88qKvLIeH5%2BN1U5zl4KKefyBJyHapeK",
                    "size": 37077010,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 720
                },
                "videoGroup": [
                    {
                        "id": 58100,
                        "name": "现场",
                        "alg": null
                    },
                    {
                        "id": 59101,
                        "name": "华语现场",
                        "alg": null
                    },
                    {
                        "id": 57108,
                        "name": "流行现场",
                        "alg": null
                    },
                    {
                        "id": 59108,
                        "name": "巡演现场",
                        "alg": null
                    },
                    {
                        "id": 1100,
                        "name": "音乐现场",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 26122,
                        "name": "孙燕姿",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "逆光",
                        "id": 287057,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 9272,
                                "name": "孙燕姿",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": "",
                        "fee": 1,
                        "v": 42,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 28520,
                            "name": "逆光",
                            "picUrl": "http://p4.music.126.net/eoSmqJdmKhNUnlGlhY9sEw==/109951166278013709.jpg",
                            "tns": [
                                "Against The Light"
                            ],
                            "pic_str": "109951166278013709",
                            "pic": 109951166278013710
                        },
                        "dt": 294000,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 11763617,
                            "vd": -57333
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 7058232,
                            "vd": -57333
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 4705540,
                            "vd": -57333
                        },
                        "a": null,
                        "cd": "1",
                        "no": 2,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 2,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 7002,
                        "mv": 5297275,
                        "publishTime": 1174492800007,
                        "privilege": {
                            "id": 287057,
                            "fee": 1,
                            "payed": 0,
                            "st": 0,
                            "pl": 0,
                            "dl": 0,
                            "sp": 0,
                            "cp": 0,
                            "subp": 0,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 0,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "E0EAE8EEB9FBE1E82F0BCA345BDEEEDE",
                "durationms": 287416,
                "playTime": 119811,
                "praisedCount": 860,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_4AE68ED348081653933FABEF1D9F2057",
                "coverUrl": "https://p1.music.126.net/ix24HlmTbJnIp8Xbepcnfg==/109951163790695143.jpg",
                "height": 1080,
                "width": 1920,
                "title": "《Cheap Thrills》音乐一响起，瞬间点燃全场！",
                "description": "《Cheap Thrills》音乐一响起，瞬间点燃全场！\n\n#在云村看现场#",
                "commentCount": 272,
                "shareCount": 733,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 31664530
                    },
                    {
                        "resolution": 480,
                        "size": 53924658
                    },
                    {
                        "resolution": 720,
                        "size": 80245764
                    },
                    {
                        "resolution": 1080,
                        "size": 115251806
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 1000000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/0fqTn4VpqjyX7iqUe41xhA==/109951166086321221.jpg",
                    "accountStatus": 0,
                    "gender": 0,
                    "city": 1010000,
                    "birthday": 883929600000,
                    "userId": 347267113,
                    "userType": 207,
                    "nickname": "Dennnnnniel",
                    "signature": ":(",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951166086321220,
                    "backgroundImgId": 109951166285210370,
                    "backgroundUrl": "http://p1.music.126.net/B_krR6XmlOPkkwAFIh51CA==/109951166285210360.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": [
                        "电子",
                        "欧美"
                    ],
                    "experts": {
                        "1": "音乐视频达人",
                        "2": "电子|欧美音乐资讯达人"
                    },
                    "djStatus": 10,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951166285210360",
                    "avatarImgIdStr": "109951166086321221"
                },
                "urlInfo": {
                    "id": "4AE68ED348081653933FABEF1D9F2057",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/4sL6iXWm_2249816499_uhd.mp4?ts=1632652536&rid=C439EA7D41510F3930FF2FB6DBC3C7BD&rl=3&rs=RAQzymvFZceBZhKaVYPNYcTHUjhdqkVZ&sign=3f71b30f61cb50dbecc12e1ecc9ad7b1&ext=FYXRvcPuMXqg%2F0MDowd1uUO%2Fw5aMNN3TRKv00BZ4sJgv4CejXouZqmezPRzJp5HVuIrJoJv6sam%2FZRTacZbG4nA37uqeJrpd4t2iJrOsn4oMXrz8660jeJNo%2FkklMgRe9T6PLvvcb8ZaUVwfTZu11X5COMyciBM9ggmWJFwcTYgY5hmRNEHe7tNDwdW5%2BkJmwUdyg8hPJxSQQad4Fy5aj101jZ6%2FWYHAW88qKvLIeH5%2BN1U5zl4KKefyBJyHapeK",
                    "size": 115251806,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 1080
                },
                "videoGroup": [
                    {
                        "id": 58100,
                        "name": "现场",
                        "alg": null
                    },
                    {
                        "id": 57106,
                        "name": "欧美现场",
                        "alg": null
                    },
                    {
                        "id": 1100,
                        "name": "音乐现场",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "Cheap Thrills",
                        "id": 403711269,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 74625,
                                "name": "Sia",
                                "tns": [],
                                "alias": []
                            },
                            {
                                "id": 43033,
                                "name": "Sean Paul",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": null,
                        "fee": 8,
                        "v": 17,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 34498076,
                            "name": "Cheap Thrills (feat. Sean Paul)",
                            "picUrl": "http://p4.music.126.net/DZDbe0oT0Nkk0l5ko6HR9w==/3408486051720554.jpg",
                            "tns": [],
                            "pic": 3408486051720554
                        },
                        "dt": 224862,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 8995569,
                            "vd": -26300
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 5397359,
                            "vd": -24100
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3598253,
                            "vd": -22900
                        },
                        "a": null,
                        "cd": "1",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 0,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 7001,
                        "mv": 0,
                        "publishTime": 1455794027601,
                        "privilege": {
                            "id": 403711269,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 0,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "4AE68ED348081653933FABEF1D9F2057",
                "durationms": 177772,
                "playTime": 1964492,
                "praisedCount": 9176,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_066C9DAED609CE4942485C5610ADE054",
                "coverUrl": "https://p2.music.126.net/Ihd2BwttSz1DKzKgu_i6nA==/109951163825734847.jpg",
                "height": 1080,
                "width": 1920,
                "title": "张敬轩：《樱花树下》（2018 HINSIDEOUT 演唱会）",
                "description": "张敬轩：《樱花树下》（2018 HINSIDEOUT 演唱会）",
                "commentCount": 272,
                "shareCount": 1090,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 39313650
                    },
                    {
                        "resolution": 480,
                        "size": 69990772
                    },
                    {
                        "resolution": 720,
                        "size": 104511879
                    },
                    {
                        "resolution": 1080,
                        "size": 157747005
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 510000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/7Xy4RXjukkM9uuDAVfliOQ==/109951164540423873.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 510100,
                    "birthday": 723052800000,
                    "userId": 16422771,
                    "userType": 207,
                    "nickname": "凌凌漆同学",
                    "signature": "不定期更新超清港乐视频和邓紫棋张靓颖音乐视频。欢迎关注，谢谢！ 微博：凌凌漆学长 B站：凌凌漆同学",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951164540423870,
                    "backgroundImgId": 109951163254618670,
                    "backgroundUrl": "http://p1.music.126.net/WngE-gOSwgM0lj8EGpUvfw==/109951163254618665.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "影视视频达人",
                        "2": "生活图文达人"
                    },
                    "djStatus": 10,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951163254618665",
                    "avatarImgIdStr": "109951164540423873"
                },
                "urlInfo": {
                    "id": "066C9DAED609CE4942485C5610ADE054",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/I6wywXQX_2283930770_uhd.mp4?ts=1632652536&rid=C439EA7D41510F3930FF2FB6DBC3C7BD&rl=3&rs=pJlHTysjmRYEJerinwqltrQiHftUECxn&sign=8b6af65c13684156af5f3f90a19c6f64&ext=FYXRvcPuMXqg%2F0MDowd1uUO%2Fw5aMNN3TRKv00BZ4sJgv4CejXouZqmezPRzJp5HVuIrJoJv6sam%2FZRTacZbG4nA37uqeJrpd4t2iJrOsn4oMXrz8660jeJNo%2FkklMgRe9T6PLvvcb8ZaUVwfTZu11X5COMyciBM9ggmWJFwcTYgY5hmRNEHe7tNDwdW5%2BkJmwUdyg8hPJxSQQad4Fy5aj101jZ6%2FWYHAW88qKvLIeH5%2BN1U5zl4KKefyBJyHapeK",
                    "size": 157747005,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 1080
                },
                "videoGroup": [
                    {
                        "id": 58100,
                        "name": "现场",
                        "alg": null
                    },
                    {
                        "id": 57105,
                        "name": "粤语现场",
                        "alg": null
                    },
                    {
                        "id": 57108,
                        "name": "流行现场",
                        "alg": null
                    },
                    {
                        "id": 59108,
                        "name": "巡演现场",
                        "alg": null
                    },
                    {
                        "id": 1100,
                        "name": "音乐现场",
                        "alg": null
                    },
                    {
                        "id": 12100,
                        "name": "流行",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 14242,
                        "name": "伤感",
                        "alg": null
                    },
                    {
                        "id": 153129,
                        "name": "张敬轩",
                        "alg": null
                    },
                    {
                        "id": 16237,
                        "name": "粤语",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": [
                    101
                ],
                "relateSong": [
                    {
                        "name": "樱花树下",
                        "id": 188384,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 6462,
                                "name": "张敬轩",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": "600902000003435367",
                        "fee": 8,
                        "v": 37,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 19073,
                            "name": "P.S. I Love You 新歌+精选",
                            "picUrl": "http://p4.music.126.net/uL-gzVXUIqTvO3uZAilQTA==/109951165230291592.jpg",
                            "tns": [],
                            "pic_str": "109951165230291592",
                            "pic": 109951165230291580
                        },
                        "dt": 249986,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 10001807,
                            "vd": -53649
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 6001102,
                            "vd": -51054
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 4000749,
                            "vd": -49347
                        },
                        "a": null,
                        "cd": "1",
                        "no": 6,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 7003,
                        "mv": 0,
                        "publishTime": 1293811200000,
                        "privilege": {
                            "id": 188384,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "066C9DAED609CE4942485C5610ADE054",
                "durationms": 301102,
                "playTime": 439213,
                "praisedCount": 2559,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_3DF7864992F9CC30C515B1CE0C573A83",
                "coverUrl": "https://p1.music.126.net/Sx2sk-fMFFfnbb4aRuVRYQ==/109951163572828883.jpg",
                "height": 720,
                "width": 1280,
                "title": "伍佰《梦醒时分》现场版，一个自己会开风扇的男人。",
                "description": "伍佰《梦醒时分》现场版，一个自己会开风扇的男人。",
                "commentCount": 1287,
                "shareCount": 2983,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 27164707
                    },
                    {
                        "resolution": 480,
                        "size": 38768553
                    },
                    {
                        "resolution": 720,
                        "size": 61952733
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 530000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/e3GMxFoMt6MM70SN_keK0w==/109951165643113056.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 532900,
                    "birthday": 654710400000,
                    "userId": 115493260,
                    "userType": 207,
                    "nickname": "苏公子会拍照呀",
                    "signature": "问题出现我再告诉大家",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951165643113060,
                    "backgroundImgId": 109951164382687890,
                    "backgroundUrl": "http://p1.music.126.net/1lLxCV7_ym8YDMr-vzPNJg==/109951164382687894.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "2": "生活图文达人"
                    },
                    "djStatus": 0,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951164382687894",
                    "avatarImgIdStr": "109951165643113056"
                },
                "urlInfo": {
                    "id": "3DF7864992F9CC30C515B1CE0C573A83",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/IdsJ3FKR_129283025_shd.mp4?ts=1632652536&rid=C439EA7D41510F3930FF2FB6DBC3C7BD&rl=3&rs=qhPZfCuJMXZjsGoIgDBnwlOAuwVKRyVU&sign=6a0945470b19b3105668456fb468a333&ext=FYXRvcPuMXqg%2F0MDowd1uUO%2Fw5aMNN3TRKv00BZ4sJgv4CejXouZqmezPRzJp5HVuIrJoJv6sam%2FZRTacZbG4nA37uqeJrpd4t2iJrOsn4oMXrz8660jeJNo%2FkklMgRe9T6PLvvcb8ZaUVwfTZu11X5COMyciBM9ggmWJFwcTYgY5hmRNEHe7tNDwdW5%2BkJmwUdyg8hPJxSQQad4Fy5aj101jZ6%2FWYHAW88qKvLIeH5%2BN1U5zl4KKefyBJyHapeK",
                    "size": 61952733,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 720
                },
                "videoGroup": [
                    {
                        "id": 58100,
                        "name": "现场",
                        "alg": null
                    },
                    {
                        "id": 1100,
                        "name": "音乐现场",
                        "alg": null
                    },
                    {
                        "id": 12100,
                        "name": "流行",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 14146,
                        "name": "兴奋",
                        "alg": null
                    },
                    {
                        "id": 15220,
                        "name": "伍佰",
                        "alg": null
                    },
                    {
                        "id": 13222,
                        "name": "华语",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "梦醒时分",
                        "id": 156284,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 222871,
                                "name": "伍佰 & China Blue",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": "",
                        "fee": 8,
                        "v": 24,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 15744,
                            "name": "单程车票",
                            "picUrl": "http://p4.music.126.net/L570AKxOSH6U4vEIMoHGXQ==/45079976751506.jpg",
                            "tns": [],
                            "pic": 45079976751506
                        },
                        "dt": 226000,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 9053085,
                            "vd": -900
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 5431886,
                            "vd": -2
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3621287,
                            "vd": -2
                        },
                        "a": null,
                        "cd": "1",
                        "no": 12,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 7003,
                        "mv": 0,
                        "publishTime": 1315497600000,
                        "privilege": {
                            "id": 156284,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "3DF7864992F9CC30C515B1CE0C573A83",
                "durationms": 232802,
                "playTime": 2212078,
                "praisedCount": 9324,
                "praised": false,
                "subscribed": false
            }
        }
    ]
      let videoList = this.data.videoList
      videoList.push(...newVideoList)
      this.setData({videoList})
    }
  },

  onShareAppMessage({from}) {
    if(from === 'button') {
      return {
        title: 'button转发的内容',
        page: '/pages/video/video',
        imageUrl: '/static/images/bizhi.jpg'
      }
    } else {
      return {
        title: 'menu转发的内容',
        page: '/pages/video/video',
        imageUrl: '/static/images/bizhi.jpg'
      }
    }
  },

  toSearch() {
    wx.navigateTo({url: '/pages/search/search'})
  }
})