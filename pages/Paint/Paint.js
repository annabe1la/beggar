// pages/Paint/Paint.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isClear: false


    },
    //笔
    penSelect: function () {
        console.log(this.data.isClear)
        this.setData({
            isClear: !this.data.isClear
        })
    },
    // //橡皮
    // eraserSelect: function () {
    //     this.setData({
    //         isClear: false
    //     })
    // },
    touchStart: function(e) {
        //得到触摸点的坐标
        this.startX = e.changedTouches[0].x
        this.startY = e.changedTouches[0].y
        console.log(e)
        this.context = wx.createContext()

        if (this.isClear) { 
            this.context.setStrokeStyle('#F8F8F8') 
            this.context.setLineCap('round') 
            this.context.setLineJoin('round')
            this.context.setLineWidth(20)
            this.context.save(); 
            this.context.beginPath()
            this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true); 
            this.context.fill(); 
            this.context.restore(); 
        } else {
            this.context.setLineCap('round') 
            this.context.beginPath()

        }
    },
    
    //手指触摸后移动
    touchMove: function(e) {

        var startX1 = e.changedTouches[0].x
        var startY1 = e.changedTouches[0].y

        if (this.isClear) { //判断是否启用的橡皮擦功能

            this.context.save(); //保存当前坐标轴的缩放、旋转、平移信息
            this.context.moveTo(this.startX, this.startY); //把路径移动到画布中的指定点，但不创建线条
            this.context.lineTo(startX1, startY1); //添加一个新点，然后在画布中创建从该点到最后指定点的线条
            this.context.stroke(); //对当前路径进行描边
            this.context.restore() //恢复之前保存过的坐标轴的缩放、旋转、平移信息

            this.startX = startX1;
            this.startY = startY1;

        } else {
            this.context.moveTo(this.startX, this.startY)
            this.context.lineTo(startX1, startY1)
            this.context.stroke()

            this.startX = startX1;
            this.startY = startY1;

        }
        wx.drawCanvas({
            canvasId: 'painter',
            reserve: true,
            actions: this.context.getActions() // 获取绘图动作数组
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})