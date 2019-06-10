let request = require('../../utils/request.js');
Page({

    data: {

    },

    onLoad: function(options) {
        request.getCategory()
            .then(res => {
                this.setData({
                    categoryList: res
                });
            })
            .catch(error => console.log(error));
    },

    toDetail(e) {
        wx.navigateTo({
            url: '../category-detail/category-detail?id=' + e.currentTarget.dataset.id,
        })
    },

    onShareAppMessage: function() {

    }

})