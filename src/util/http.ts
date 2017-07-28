import * as request from 'request'
import {ApiConfig} from '../interfaces/app-config'

interface HeaderMap {
  [key: string]: string
}

export default class Http {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config
  }

  private buildHeaders(requestType: string, defaultHeaders: HeaderMap) {
    let addMap: HeaderMap = {}
    // if there's an auth token we'll use the Basic Auth header
    if (this.config.authToken) {
      addMap['Authorization'] = 'Bearer ' + this.config.authToken
    }
    // if it's cross origin, we'll add the access control for request type and all headers
    if (this.config.crossOrigin) {
      let keys = []
      for (var i in defaultHeaders) {
        keys.push(i)
      }
      let requestHeaderKeys = keys.join(', ')
      addMap['Access-Control-Request-Method'] = requestType
      addMap['Access-Control-Request-Headers'] = requestHeaderKeys
    }
    // lookup spread syntax if you're confused here.
    return {...defaultHeaders, ...addMap};
  }

  private buildBaseUrl() {
    return this.config.protocol + '://' + this.config.host + this.config.path;
  }

  public createRequest(requestType: string, path: string, requestBody: any) : Promise<any> {
    let headers = this.buildHeaders(requestType, this.config.headers)
    let url = this.buildBaseUrl() + path
    return new Promise((resolve, reject) => {
      // this noPost is pretty much for testing only.
      // POST is typically the final step in any use case,
      // since it's what will actually update the stories,
      // so if we don't POST, we can see everything the code is
      // doing but not actually modify the stories.
      if (requestType === 'POST' && this.config.noPost) {
        console.log(`Would request to ${url}`, requestBody)
        resolve({})
      } else {
        var body = "";
        request({
          method: requestType,
          url: url,
          headers: headers,
          body: requestBody,
          json: true
        })
        .on('data', (dataChunk) => {body += dataChunk})
        .on('error', (e) => {reject(e)})
        .on('complete', () => {
          try {
            resolve(JSON.parse(body))
          } catch (e) {
            reject(e)
          }
        })
      }
    })
  }
}

class PojoToMap {
  static convert(obj: any) {
    let output = new Map<string, any>()
    try {
      for (var i in obj) {
        output.set(i, obj[i])
      }
    } catch(e) {
      console.error('Unable to map Pojo to Map', e)
    }
    return output
  }
}
