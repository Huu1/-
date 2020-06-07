// components/date/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer: function (newVal) {
        let Val = newVal < 10 ? "0" + newVal : newVal;
        this.setData({
          _index: Val,
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    monthList: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    year: 0,
    month: "",
    _index: "",
  },
  attached: function () {
    let date = new Date();
    this.setData({
      year: date.getFullYear(),
      month: this.data.monthList[date.getMonth()],
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {},
});
