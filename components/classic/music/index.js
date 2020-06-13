// components/classic/music/index.js
import { classicBase } from "../classic-beh.js";
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBase],
  properties: {
    src: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playImg: "./img/player@playing.png",
    pauseImg: "./img/player@waitting.png",
  },

  /**
   * 组件的方法列表
   */
  attached: function () {
    this._recoverStatus();
    this._monitorSwitch();
  },

  methods: {
    isPlaying: function (e) {
      this.setData({
        playing: !this.data.playing,
      });
      mMgr.title = "s";
      this.data.playing ? (mMgr.src = this.properties.src) : mMgr.pause();
    },
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false,
        });
        return;
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true,
        });
      }
    },
    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus();
      });
      mMgr.onPause(() => {
        this._recoverStatus();
      });
      mMgr.onStop(() => {
        this._recoverStatus();
      });
      mMgr.onEnded(() => {
        this._recoverStatus();
      });
    },
  },
});
