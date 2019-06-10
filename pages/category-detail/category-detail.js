let request = require('../../utils/request.js');
Page({

    data: {
        refreshing: false, // 将refreshing设为true，可支持自动触发下拉刷新的场景。同样会触发refresh事件
        refreshed: false, // 将本属性设置为true，收起下拉刷新，可多次设置为true（即便原来已经是true了）
        refreshH: -250,
        itemList: [],
        itemList2: [],
        isLoading: false,
        selectTab: 1,
        isTop:false
    },

    onLoad: function(options) {
        wx.showLoading({
            title: '加载中....',
        })
        request.getCategoryDetail(options.id)
            .then(res => {
                wx.setNavigationBarTitle({
                    title: res.categoryInfo.name,
                })
                this.setData({
                    categoryInfo: res.categoryInfo,
                    url: res.tabInfo.tabList[0].apiUrl
                });
                return res.tabInfo.tabList[0].apiUrl
            })
            .then(url => {
                return request.getNext(url)
            })
            .then(res => {
                this.setData({
                    'itemList[0]': res.itemList,
                    isLoading: true
                });
                wx.hideLoading();
            })
            .then(() => {
                return request.getVideoList(options.id)
            })
            .then(res => {
                this.setData({
                    'itemList2[0]': res.itemList,
                    nextPageUrl: res.nextPageUrl,
                    page: 1,
                    isLoading: true
                });
            })
            .catch(error => console.log(error));
    },

    refresh() {
        switch (this.data.selectTab) {
            case 1:
                request.getNext(this.data.url)
                    .then(res => {
                        this.data.itemList = [];
                        this.setData({
                            'itemList[0]': res.itemList,
                            isLoading: true,
                            refreshed: true
                        });
                    })
                    .catch(error => console.log(error));
                break;
            case 2:
                this.setData({
                    refreshed: true
                });
                break;
        }
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

    myscroll: function(e) {
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
        if (this.data.isLoading && this.data.selectTab != 1) {
            request.getNext(this.data.nextPageUrl)
                .then(res => {
                    let key = `itemList2[${this.data.page++}]`;
                    if (res.nextPageUrl != null) {
                        this.data.nextPageUrl = res.nextPageUrl;
                        this.setData({
                            [key]: res.itemList
                        });
                    } else {
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