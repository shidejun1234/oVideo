let request = require('../../utils/request.js');
Page({

    data: {
        itemList: [],
        isLoading: false
    },

    onLoad: function(options) {
        request.getCategoryDetail(options.id)
            .then(res => {
                wx.setNavigationBarTitle({
                    title: res.categoryInfo.name,
                })
                this.setData({
                    categoryInfo: res.categoryInfo
                });
                console.log(res)
                return res.tabInfo.tabList[0].apiUrl
            })
            .then(url => {
                return request.getNext(url)
            })
            .then(res => {
                this.setData({
                    'itemList[0]': res.itemList,
                    nextPageUrl: res.nextPageUrl,
                    page: 1,
                    isLoading: true
                });
            })
            .catch(error => console.log(error));
    },

    toVideo(e) {
        wx.navigateTo({
            url: '../video/video?id=' + e.currentTarget.dataset.id
        })
    },

    onPullDownRefresh() {
        console.log(1)
    },

    onReachBottom() {
        if (this.data.isLoading) {
            request.getNext(this.data.nextPageUrl)
                .then(res => {
                    let key = `itemList[${this.data.page++}]`;
                    if (res.nextPageUrl != null) {
                        this.data.nextPageUrl = res.nextPageUrl;
                        console.log(res)
                        this.setData({
                            [key]: res.itemList
                        });
                    } else {
                        console.log(res)
                        wx.showToast({
                            title: '已全部加载',
                            icon: 'none'
                        })
                        this.setData({
                            [key]: res.itemList,
                            isLoading: false
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },

    onShareAppMessage: function() {

    }
})