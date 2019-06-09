let request = require('../../utils/request.js')
Page({
    data: {
        isLoading: false,
        itemList: []
    },
    onLoad(options) {
        let id = options.id;
        request.getVideo(id)
            .then(res => {
                wx.setNavigationBarTitle({
                    title: res.title
                })
                console.log(res)
                this.setData({
                    video: res
                });
            })
            .then(() => {
                return request.getRelated(id)
            })
            .then(res => {
                console.log(res)
                if (res.nextPageUrl != null) {
                    this.setData({
                        'itemList[0]': res.itemList,
                        isLoading: true,
                        nextPageUrl: res.nextPageUrl,
                        page: 1
                    })
                } else {
                    this.setData({
                        'itemList[0]': res.itemList
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
        wx.request({
            url: 'http://baobab.kaiyanapp.com/api/v4/video/related?id=45897',
        })
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
                    this.data.nextPageUrl = res.nextPageUrl;
                    let key = `itemList[${this.data.page++}]`;
                    this.setData({
                        [key]: res.itemList
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    onShareAppMessage(res) {
        let video = this.data.video;
        return {
            title: video.title,
            path: '/pages/video/video?id=' + video.id
        }
    }
})