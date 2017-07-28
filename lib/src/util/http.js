"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class Http {
    constructor(config) {
        this.config = config;
    }
    buildHeaders(requestType, defaultHeaders) {
        let addMap = {};
        // if there's an auth token we'll use the Basic Auth header
        if (this.config.authToken) {
            addMap['Authorization'] = 'Bearer ' + this.config.authToken;
        }
        // if it's cross origin, we'll add the access control for request type and all headers
        if (this.config.crossOrigin) {
            let keys = [];
            for (var i in defaultHeaders) {
                keys.push(i);
            }
            let requestHeaderKeys = keys.join(', ');
            addMap['Access-Control-Request-Method'] = requestType;
            addMap['Access-Control-Request-Headers'] = requestHeaderKeys;
        }
        // lookup spread syntax if you're confused here.
        return Object.assign({}, defaultHeaders, addMap);
    }
    buildBaseUrl() {
        return this.config.protocol + '://' + this.config.host + this.config.path;
    }
    createRequest(requestType, path, requestBody) {
        let headers = this.buildHeaders(requestType, this.config.headers);
        let url = this.buildBaseUrl() + path;
        return new Promise((resolve, reject) => {
            // this noPost is pretty much for testing only.
            // POST is typically the final step in any use case,
            // since it's what will actually update the stories,
            // so if we don't POST, we can see everything the code is
            // doing but not actually modify the stories.
            if (requestType === 'POST' && this.config.noPost) {
                console.log(`Would request to ${url}`, requestBody);
                resolve({});
            }
            else {
                var body = "";
                request({
                    method: requestType,
                    url: url,
                    headers: headers,
                    body: requestBody,
                    json: true
                })
                    .on('data', (dataChunk) => { body += dataChunk; })
                    .on('error', (e) => { reject(e); })
                    .on('complete', () => {
                    try {
                        resolve(JSON.parse(body));
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
        });
    }
}
exports.default = Http;
class PojoToMap {
    static convert(obj) {
        let output = new Map();
        try {
            for (var i in obj) {
                output.set(i, obj[i]);
            }
        }
        catch (e) {
            console.error('Unable to map Pojo to Map', e);
        }
        return output;
    }
}
