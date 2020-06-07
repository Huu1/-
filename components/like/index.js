// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: "./img/like.png",
    noSrc: "./img/like@dis.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      let count = this.properties.count;
      let like = this.properties.like;
      count = like ? count - 1 : count + 1;
      this.setData({
        count,
        like: !like,
      });
      let behavior = this.properties.like ? "like" : "cancel";
      // 自定义事件
      this.triggerEvent(
        "like",
        {
          behavior,
        },
        {}
      );
    },
  },
});
