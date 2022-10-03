// const stream = require("stream");

const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");
const proxy = require("https-proxy-agent");
const proxyAgent = () => {
  proxylist = [
    "181.176.211.168:8080",
    "180.211.248.222:8080",
    "187.94.211.214:8080",
    "103.187.117.10:8080",
    "115.96.208.124:8080",
    "185.61.152.137:8080",
    "116.58.254.57:8080",
    "110.78.146.126:8080",
    "198.59.191.234:8080",
    "118.67.221.82:8080",
    "125.25.33.140:8080",
    "174.138.24.67:8080",
    "119.76.142.148:8080",
    "199.58.128.75:8080",
    "182.253.109.111:8080",
    "180.183.105.32:8080",
    "43.251.135.19:8080",
  ];
  new proxy(proxylist[Math.floor(Math.random() * proxylist.length)]);
};
// const toArray = require("stream-to-array");

const uploadByUrl = (url, agent) => {
  return fetch(url).then(async (r) => {
    if (!(r.body instanceof stream.Stream)) {
      throw new TypeError("Response is not a stream");
    }
    const array = await toArray(r.body);
    const buffer = Buffer.concat(array);

    if (!r.headers.get("content-type")) {
      throw new Error("No content types in the response");
    }

    return uploadByBuffer(buffer, r.headers.get("content-type"), agent);
  });
};

const uploadToTelegraph = (buffer, contentType, agent) => {
  if (!Buffer.isBuffer(buffer)) {
    throw new TypeError("Buffer is not a Buffer");
  }
  const form = new FormData();

  form.append("photo", buffer, {
    filename: "blob",
    contentType,
    ...(agent && { agent }),
  });
  try {
    return fetch("https://telegra.ph/upload", {
      method: "POST",
      body: form,
      // agent: proxyAgent(),
    })
      .then(
        (result) => result.json(),
        (err) => {
          throw err;
        }
      )
      .then((result) => {
        if (result[0] && result[0].src) {
          return {
            url: "https://telegra.ph" + result[0].src,
            path: result[0].src,
          };
        }
      });
  } catch (e) {
    throw e;
  }
};
// const uploadToTelegraph = async (fileBuffer) => {
//   return await uploadByBuffer(fileBuffer, "image/png");
// };

module.exports = {
  uploadByUrl,
  uploadToTelegraph,
};
