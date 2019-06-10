let request = require('../../utils/request.js');
Page({

    data: {
        isTop: false,
        selectTab: 1,
        isLoading1: false,
        isLoading2: false,
        isLoading3: false
    },

    onLoad: function (options) {
        wx.showLoading({
            title: '加载中....',
        })
        //周排行
        request.getRankList('weekly')
            .then(res => {
                let weekly = [];
                let i = -1;
                res.itemList.forEach((item,index) => {
                    if (index%10==0) {
                        weekly.push([]);
                        i++;
                    }
                    weekly[i].push(item);
                })
                this.setData({
                    weekly: weekly,
                    'weeklyList[0]': weekly[0],
                    isLoading1: true,
                    page1:1
                })
                wx.hideLoading();
            })
            .then(() => {
                //月排行
                return request.getRankList('monthly')
            })
            .then(res => {
                let monthly = [];
                let i = -1;
                res.itemList.forEach((item, index) => {
                    if (index % 10 == 0) {
                        monthly.push([]);
                        i++;
                    }
                    monthly[i].push(item);
                })
                this.setData({
                    monthly: monthly,
                    'monthlyList[0]': monthly[0],
                    isLoading2: true,
                    page2: 1
                })
            })
            .then(() => {
                //总排行
                return request.getRankList('historical')
            })
            .then(res => {
                let historical = [];
                let i = -1;
                res.itemList.forEach((item, index) => {
                    if (index % 10 == 0) {
                        historical.push([]);
                        i++;
                    }
                    historical[i].push(item);
                })
                this.setData({
                    historical: historical,
                    'historicalList[0]': historical[0],
                    isLoading3: true,
                    page3: 1
                })
            })
            .catch(error => console.log(error));
    },

    select(e) {
        let id = e.currentTarget.dataset.id;
        if (id != this.data.selectTab) {
            this.setData({
                selectTab: Number(id)
            })
        }
    },

    toVideo(e) {
        wx.navigateTo({
            url: '../video/video?id=' + e.currentTarget.dataset.id
        })
    },

    myscroll: function (e) {
        if (e.detail.scrollTop > 1000) {
            this.setData({
                isTop: true
            })
        } else {
            this.setData({
                isTop: false
            })
        }
    },

    top: function () {
        this.setData({
            scrollTop: 0
        })
    },

    lower() {
        switch (this.data.selectTab) {
            case 1:
                if (this.data.isLoading1) {
                    let weekly = this.data.weekly;
                    if (this.data.page1 + 1 == weekly.length) {
                        this.setData({
                            isLoading1: false
                        });
                    }
                    let key = `weeklyList[${this.data.page1}]`;
                    this.setData({
                        [key]: weekly[this.data.page1++]
                    });
                }
                break;
            case 2:
                if (this.data.isLoading2) {
                    let monthly = this.data.monthly;
                    if (this.data.page2 + 1 == monthly.length) {
                        this.setData({
                            isLoading2: false
                        });
                    }
                    let key = `monthlyList[${this.data.page2}]`;
                    this.setData({
                        [key]: monthly[this.data.page2++]
                    });
                }
                break;
            case 3:
                if (this.data.isLoading3) {
                    let historical = this.data.historical;
                    if (this.data.page3 + 1 == historical.length) {
                        this.setData({
                            isLoading3: false
                        });
                    }
                    let key = `historicalList[${this.data.page3}]`;
                    this.setData({
                        [key]: historical[this.data.page3++]
                    });
                }
                break;
        }
    },

    onShareAppMessage: function() {

    }
})