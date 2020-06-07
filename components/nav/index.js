// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    latest: Boolean,
    first: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftImg: "./img/triangle@left.png",
    disLeftImg: "./img/triangle.dis@left.png",
    rightImg: "./img/triangle@right.png",
    disRightImg: "./img/triangle.dis@right.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function (e) {
      if (this.properties.latest) {
        return;
      }
      this.triggerEvent("onLeft", {}, {});
    },
    onRight: function (e) {
      if (this.properties.first) {
        return;
      }
      this.triggerEvent("onRight", {}, {});
    },
  },
});
