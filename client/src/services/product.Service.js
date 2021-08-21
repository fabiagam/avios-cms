import http from "./axiosClient";

class ProductDataService {
  static getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        http.get("/avios/products").then((data) => {
          return resolve(data.data);
        });
      }, 1500);
    });
  }

  static get(id) {
    return http.get(`/tutorials/${id}`);
  }

  static create(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        http.post("/avios/product", data).then((odata) => {
          return resolve(odata.data);
        });
      }, 1500);
    });
  }

  static update(id, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        return http.put(`/avios/product/update/${id}`, data).then((odata) => {
          return resolve(odata.data);
        });
      }, 1500);
    });
  }

  static delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        http.delete(`/avios/product/delete/${id}`).then((data) => {
          return resolve(data.data);
        });
      }, 1500);
    });
  }

  static deleteVariant() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default ProductDataService;
