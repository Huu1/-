import { HTTP } from "../util/http.js";
class classicModel extends HTTP {
  // 获取最新一期
  getLatest(cb) {
    this.request({
      url: "/classic/latest",
      ok: (res) => {
        cb(res.msg);
        this._setLatest(res.msg.index);
        // 不知晓 最新期是多少 所以缓存一次
        wx.setStorageSync(this._getKey(res.msg.index), res.msg);
      },
    });
  }
  /**
   *根据参数 获取当期的前一期或下一期   已设置缓存
   * @param {回调函数} cb
   * @param {当前期刊} index
   * @param {下一期还是上一期} preOrNext
   */
  getClassic(cb, index, preOrNext) {
    // 获取上一期或下一期对应的 缓存key
    let key =
      preOrNext == "next" ? this._getKey(index + 1) : this._getKey(index - 1);
    // 检测是否缓存了上一期或下一期的数据
    let hasKey = wx.getStorageSync(key);
    if (hasKey) {
      // 有缓存 直接返回数据
      cb(hasKey);
    } else {
      // 无缓存 先请求再缓存数据
      this.request({
        url: `/classic/${preOrNext}/${index}`,
        ok: (res) => {
          // 缓存
          wx.setStorageSync(this._getKey(res.msg.index), res.msg);
          cb(res.msg);
        },
      });
    }
  }
  // 设置缓存 key
  _getKey(index) {
    return "classic-" + index;
  }
  // 是否最新一期
  isLatest(index) {
    return this._getLatest() == index ? true : false;
  }
  // 是否第一期
  isFirst(index) {
    return index == 1 ? true : false;
  }
  // 存取最新的一期的index
  _setLatest(index) {
    wx.setStorageSync("latest", index);
  }
  // 获取最新一期
  _getLatest() {
    return wx.getStorageSync("latest");
  }
}
export { classicModel };
