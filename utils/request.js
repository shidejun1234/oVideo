let app = getApp();
let api = app.globalData.api;

let getFeed = () => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}v2/feed`,
            success: res => {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    reject('error');
                }
            }
        })
    });
}

let getNext = url => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${url}`,
            success: res => {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    reject('error');
                }
            }
        })
    });
}

let getVideo = id => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}v1/video/${id}`,
            success: res => {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    reject('error');
                }
            }
        })
    })
}

let getRelated = id => {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: `${api}v4/video/related?id=${id}`,
            success: res => {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    reject('error');
                }
            }
        })
    })
}

module.exports = {
    getFeed: getFeed,
    getNext: getNext,
    getVideo: getVideo,
    getRelated: getRelated
}