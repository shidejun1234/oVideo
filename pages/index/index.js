let request = require('../../utils/request.js');
Page({
    data: {
        nextPageUrl: '',
        itemList: []
    },
    onLoad() {
        request.getFeed()
            .then(res => {
                this.data.nextPageUrl = res.nextPageUrl;
                this.setData({
                    'itemList[0]': res.issueList[0].itemList,
                    page: 1
                })
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
    lower() {
        request.getNext(this.data.nextPageUrl)
            .then(res => {
                this.data.nextPageUrl = res.nextPageUrl;
                let key = `itemList[${this.data.page++}]`;
                this.setData({
                    [key]: res.issueList[0].itemList
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
})