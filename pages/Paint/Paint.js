// pages/Paint/Paint.js
let ctx = wx.createCanvasContext('painter', this);
const widths = [];
for (let i = 1; i <= 50; i++) {
    widths.push(i);
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        color: 'black',
        colors: ['red', '#d81e06', '#faea2a', '#ff9800', '#faf0aa', '#1afa29', '#1296db', '#13227a', '#d4237a', '#bfbfbf', '#8a8a8a', '#707070', '#515151', '#2c2c2c', "black"],
        isPenSelect: true,
        chooseBgHidden: true,
        originX: 0,
        originY: 0,
        width: 1,
        widths: widths,
        index: 0,
        onShow: false
    },
    //笔
    penSelect: function () {
        this.setData({
            isPenSelect: !this.data.isPenSelect
        })
    },
    //橡皮
    eraserSelect: function () {
        this.setData({
            color: 'white'
        })
    },
    touchStart: function (e) {
        this.setData({
            originX: e.changedTouches[0].x,
            originY: e.changedTouches[0].y
        })
        ctx.setStrokeStyle(this.data.color);
        ctx.setLineWidth(this.data.width);
        ctx.setLineCap('round');
        ctx.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
    },

    //手指触摸后移动
    touchMove: function (e) {
        ctx.moveTo(this.data.originX, this.data.originY);
        ctx.lineTo(e.touches[0].x, e.touches[0].y);
        ctx.stroke();
        // ctx.draw();
        wx.drawCanvas({
            canvasId: "painter",
            actions: ctx.getActions(),
            reserve: true
        })
        this.setData({
            originX: e.touches[0].x,
            originY: e.touches[0].y
        })
    },
    touchEnd: function (e) {
        // 就当无事发生
    },
    clearCanvas: function () {
        ctx.clearActions();
        wx.drawCanvas({
            canvasId: "painter",
            actions: ctx.getActions(),
            reserve: false
        })
    },
    chooseColor: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            color: this.data.colors[index]
        })
    },
    saveSelect: function () {
        wx.showModal({
            title: '保存',
            content: '是否保存当前画布的内容？',
            success: function (res) {
                if (res.confirm) {
                    wx.canvasToTempFilePath({
                        canvasId: 'painter',
                        success: function (res) {
                            wx.saveImageToPhotosAlbum({
                                filePath: res.tempFilePath,
                                success: function (res) {
                                    wx.showToast({
                                        title: '保存成功',
                                    })
                                },
                                fail: function (res) {
                                    wx.showToast({
                                        title: '保存失败',
                                        icon: 'none'
                                    })
                                }
                            })
                        },
                        fail: function (res) {
                            wx.showToast({
                                title: '保存失败',
                                icon: 'none'
                            })
                        }
                    }, this)
                }
            }
        })
    },
    widthChange: function (e) {
        console.log(e)
        const val = e.detail.value
        //   year: this.data.years[val[0]],
        //   month: this.data.months[val[1]],
        //   day: this.data.days[val[2]]
        this.setData({
            index: e.detail.value,
            width: this.data.widths[val]
        })
    },
    toMyFriend: function () {
        wx.navigateTo({
            url: "../myFriend/myFriend"
        })
    },
    skip: function () {
        this.setData({
            onShow: true
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let t = setTimeout(
            () => {
                this.setData({
                    onShow: true,
                });
                clearTimeout(t)
            }, 6000)

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
        return {
 
            title: '💖EvergardenVvv',
 
            desc: 'Have Fun!',
 
            path: '/page/login/login'
 
        }

    }
})