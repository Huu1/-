import { classicModel } from "../../api/classic.js";
import { likeModel } from "../../api/like.js";
let classic = new classicModel();
let like = new likeModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true,
    like_status: 0,
    fav_nums: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    classic.getLatest((res) => {
      this.setData({
        classicData: res,
        like_status: res.like_status,
        fav_nums: res.fav_nums,
      });
    });
  },
  onLike: function (e) {
    let { detail } = e;
    like.like(
      detail.behavior,
      this.data.classicData.id,
      this.data.classicData.type
    );
  },
  // 下一期
  onLeft: function (e) {
    this._getClassic("next");
  },
  // 上一期
  onRight: function (e) {
    this._getClassic("previous");
  },

  _getClassic(nextOrPre) {
    let index = this.data.classicData.index;
    classic.getClassic(
      (res) => {
        this._getLikeStatus(res.id, res.type);
        this.setData({
          classicData: res,
          latest: classic.isLatest(res.index),
          first: classic.isFirst(res.index),
        });
      },
      index,
      nextOrPre
    );
  },
  // 获取点赞数和状态
  _getLikeStatus(id, type) {
    like.getLikeStatus(id, type, (res) => {
      this.setData({
        fav_nums: res.msg.fav_nums,
        like_status: res.msg.like_status,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("ssss");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
