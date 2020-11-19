//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    welcome: 'Welcome to my world ',
    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/0LwxIFSf6VVZLpexsmSPUaU1AiaAguYXl2dEBDokmv6hiaHQdSMT2sUwY6Z2ylmnVGKQenXhqIDzlzjdliaj9wK0w/132",
    hasUserInfo: true,
    date:'',
    weather:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bg: {
      bg1:'https://static.likerain.cn/2020/11/1300202330.png',
      bg2:'https://static.likerain.cn/2020/11/189268560.png',
      bg3:'https://static.likerain.cn/2020/11/1389457147.png',
      bg4:'https://static.likerain.cn/2020/11/4212659594.png',
      bg5:'https://static.likerain.cn/2020/11/539427448.png',
      bg6:'https://static.likerain.cn/2020/11/937960133.png',
    },
    text:{
      txt1:"保持热爱，奔赴山海",
      txt2:"宇宙山河浪漫，生活点滴温暖",
      txt3:"永远相信美好的事情即将发生",
      txt4:"前路浩浩荡荡，万事皆可期待",
      txt5:"我们的征途是星辰大海",
      txt6:"生活原本沉闷，但跑起来就有风",
      txt7:"生活明朗，万物可爱",
      txt8:"唯有热爱，能抵漫长岁月",
      txt9:"每颗人间烟火，都不要错过",
      txt10:"愿世俗多点温柔，愿你少点难过",

    },
    bgUrl:"",
  },
  //事件处理函数
  bindViewTap: function() {
   alert("生活明朗，万物可爱");
  },
  onLoad: function () {
    const time = new Date();
    this.setData({
      bgUrl:this.getBGUrl(),
      motto:this.getMotto(),
      date:this.getCurrentTime(),
    })
    const _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        wx.showLoading({title: '生活明朗，万物可爱',mask:true})
        wx.request({
          url: 'https://www.likerain.cn/api/getWeather', 
          data: { latitude: res.latitude, longitude:res.longitude},
          header: {'content-type': 'application/json' },
          success (res) {
            const data = res.data.data.lives[0];
            _this.setData({weather:data})
            wx.hideLoading()
          }
        })
      }
    })
  },
  onReady:function(){
   
  },
  getBGUrl() {
    var b =this.data.bg["bg"+Math.floor(Math.random() * (6 - 1 + 1) + 1)];
    console.log(b);
    return  b;
  },
  getMotto(){
    var m =this.data.text["txt"+Math.floor(Math.random() * (10 - 1 + 1) + 1)];
    return m;
  },
  getCurrentTime(){
		var dtCur = new Date();
		var yearCur = dtCur.getFullYear();
		var monCur = dtCur.getMonth() + 1;
		var dayCur = dtCur.getDate();
		var hCur = dtCur.getHours();
		var mCur = dtCur.getMinutes();
		var sCur = dtCur.getSeconds();
		var timeCur = yearCur + "-" + (monCur < 10 ? "0" + monCur : monCur) + "-"
				+ (dayCur < 10 ? "0" + dayCur : dayCur) + " " + (hCur < 10 ? "0" + hCur : hCur)
				+ ":" + (mCur < 10 ? "0" + mCur : mCur) + ":" + (sCur < 10 ? "0" + sCur : sCur);
		//alert(timeCur);// 输出时间
		return timeCur;
	},

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
