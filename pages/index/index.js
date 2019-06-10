let request = require('../../utils/request.js');
Page({
    data: {
        nextPageUrl: '',
        isLoading: false,
        itemList: [],
        isTop: false
    },

    onLoad() {
        wx.showLoading({
            title: '加载中....',
        })
        request.getFeed()
            .then(res => {
                this.data.nextPageUrl = res.nextPageUrl;
                this.setData({
                    'itemList[0]': res.issueList[0].itemList,
                    page: 1,
                    isLoading: true
                });
                wx.hideLoading();
            })
            .catch(error => {
                console.log(error);
            })
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
        request.getNext(this.data.nextPageUrl)
            .then(res => {
                let key = `itemList[${this.data.page++}]`;
                if (res.nextPageUrl != null) {
                    this.data.nextPageUrl = res.nextPageUrl;
                    this.setData({
                        [key]: res.issueList[0].itemList
                    });
                } else {
                    wx.showToast({
                        title: '已全部加载',
                        icon: 'none'
                    })
                    this.setData({
                        [key]: res.issueList[0].itemList,
                        isLoading: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
})