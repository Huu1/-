import { HTTP } from "../util/http.js";
class likeModel extends HTTP {
  like(behavior, art_id, type) {
    let url = behavior == "like" ? "/like" : "/like/cancel";
    this.request({
      url,
      method: "POST",
      data: {
        art_id,
        type,
      },
    });
  }
  getLikeStatus(art_id, type, cb) {
    let url = `/classic/favor/${type}/${art_id}`;
    this.request({
      url,
      ok: cb,
    });
  }
}
export { likeModel };
