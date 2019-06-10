let app = getApp();
let api = app.globalData.api;

let getFeed = () => {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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

let getCategory = () => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${api}v4/categories/`,
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

let getCategoryDetail = id => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${api}v4/categories/detail/tab?id=${id}`,
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

let getVideoList = id => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${api}v3/categories/videoList?id=${id}`,
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
    getRelated: getRelated,
    getCategory: getCategory,
    getCategoryDetail: getCategoryDetail,
    getVideoList: getVideoList
}