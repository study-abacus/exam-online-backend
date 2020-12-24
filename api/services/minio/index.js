const Minio = require('minio');
const config = require('config');

class MinioService {
  constructor(app) {
    this._app = app;
    this._client = new Minio.Client({
      endPoint: config.MINIO.ENDPOINT,
      accessKey: config.MINIO.ACCESS_KEY,
      secretKey: config.MINIO.SECRET_KEY,
      port: 9000,
      useSSL: false,
    });
  }

  get minioClient() {
    return this._client;
  }
}

module.exports = MinioService;
