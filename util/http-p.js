import { config } from "../config.js";

class HTTP {
  constructor() {
    this.tips = {
      1: "发生了一个错误!",
      1005: "key错误!",
      3000: "期刊不存在!",
      1008: "路由错误",
    };
  }
  request(url, data = {}, method = "GET") {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    });
  }
  _request(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.API_BASE_URL + url,
      method,
      data,
      header: {
        "content-type": "application/json",
        appkey: config.APPKEY,
      },
      success: (res) => {
        let code = res.data.error_code + "";
        if (res.statusCode == 200 && code.startsWith("0")) {
          resolve(res.data);
        } else {
          reject();
          this._showError(res.data.error_code);
        }
      },
      fail: (err) => {
        reject();
        wx.showToast({
          title: "网络错误",
          icon: "none",
          duration: 2000,
        });
      },
    });
  }
  _showError(errCode) {
    errCode = errCode ? errCode : 1;
    wx.showToast({
      title: this.tips[errCode],
      icon: "none",
      duration: 2000,
    });
  }
}
export { HTTP };
