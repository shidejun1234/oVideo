let request = require('../../utils/request.js')
Page({
    data: {
        isLoading: false,
        itemList: [],
        isWiFi: true
    },
    onLoad(options) {
        wx.showLoading({
            title: '加载中....',
        })
        this.videoContext = wx.createVideoContext('myVideo')
        wx.getNetworkType({
            success: (res) => {
                if (res.networkType != 'wifi') {
                    this.setData({
                        isWiFi: false
                    })
                }
            }
        })
        let id = options.id;
        request.getVideo(id)
            .then(res => {
                wx.setNavigationBarTitle({
                    title: res.title
                })
                this.setData({
                    video: res
                });
                wx.hideLoading();
            })
            .then(() => {
                return request.getRelated(id)
            })
            .then(res => {
                let itemList = [];
                let i = -1;
                res.itemList.forEach((item) => {
                    if (item.type == 'textCard') {
                        itemList.push([]);
                        i++;
                    }
                    itemList[i].push(item);
                })
                this.data.itemList2 = itemList;
                this.setData({
                    'itemList[0]': itemList[0],
                    isLoading: true,
                    page: 1
                })
            })
            .catch(error => {
                console.log(error)
            })
        wx.request({
            url: 'http://baobab.kaiyanapp.com/api/v4/video/related?id=45897',
        })
    },

    play() {
        this.setData({
            isWiFi: true
        })
    },

    toVideo(e) {
        wx.navigateTo({
            url: '../video/video?id=' + e.currentTarget.dataset.id
        })
    },
    lower() {
        if (this.data.isLoading) {
            let itemList2 = this.data.itemList2;
            if (this.data.page + 1 == itemList2.length) {
                this.setData({
                    isLoading: false
                });
            }
            let key = `itemList[${this.data.page}]`;
            this.setData({
                [key]: itemList2[this.data.page++]
            });
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