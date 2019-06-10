let request = require('../../utils/request.js');
Page({

    data: {
        refreshing: false, // 将refreshing设为true，可支持自动触发下拉刷新的场景。同样会触发refresh事件
        refreshed: false, // 将本属性设置为true，收起下拉刷新，可多次设置为true（即便原来已经是true了）
        refreshH: -250,
        itemList: [],
        isLoading: false
    },

    refresh() {
        request.getNext(this.data.url)
            .then(res => {
                this.data.itemList = [];
                this.setData({
                    'itemList[0]': res.itemList,
                    nextPageUrl: res.nextPageUrl,
                    page: 1,
                    isLoading: true,
                    refreshed: true
                });
            })
            .catch(error => console.log(error));
    },

    onLoad: function(options) {
        options.id=14
        request.getCategoryDetail(options.id)
            .then(res => {
                wx.setNavigationBarTitle({
                    title: res.categoryInfo.name,
                })
                this.setData({
                    categoryInfo: res.categoryInfo,
                    url: res.tabInfo.tabList[0].apiUrl
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