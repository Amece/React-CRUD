import http from "../http-common";

class WallpaperDataService {
  getAll(params) {
    return http.get("/wallpapers", { params });
  }

  get(id) {
    return http.get(`/wallpapers/${id}`);
  }

  create(data) {
    return http.post("/wallpapers", data);
  }

  update(id, data) {
    return http.put(`/wallpapers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/wallpapers/${id}`);
  }

}

export default new WallpaperDataService();