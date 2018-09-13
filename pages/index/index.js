//index.js
//获取应用实例
const app = getApp();
let timer;

Page({
    data: {
        imgOpacity: 1,
        iconOpacity: 0
    },
    //事件处理函数
    toLogin:function() {
        wx.redirectTo({
            url:"../login/login"
        })
    },
    onLoad: function () {
        // 背景逐渐透明
        timer = setInterval(() => {
            // 背景透明度减到0.1
            if (this.data.imgOpacity > 0.1) {
                this.setData({ imgOpacity: this.data.imgOpacity - 0.05 })
            }
            // 背景减到0.5时标志出现
            if (this.data.imgOpacity < 0.5 && this.data.iconOpacity < 1) {
                this.setData({ iconOpacity: this.data.iconOpacity + 0.025 })
            }
            // 标志透明度1时清除定时器
            if (this.data.iconOpacity >= 1 && this.data.imgOpacity < 0.1) {
                clearInterval(timer)
            }
        }, 150);
    },
    
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
 
            title: '💖EvergardenVvv',
 
            desc: 'Have Fun!',
 
            path: '/page/index/index'
 
        }

    }
})