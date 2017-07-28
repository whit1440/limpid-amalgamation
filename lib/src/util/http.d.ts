import { ApiConfig } from '../interfaces/app-config';
export default class Http {
    private config;
    constructor(config: ApiConfig);
    private buildHeaders(requestType, defaultHeaders);
    private buildBaseUrl();
    createRequest(requestType: string, path: string, requestBody: any): Promise<any>;
}
