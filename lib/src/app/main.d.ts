import AppConfig from '../interfaces/app-config';
import ConfigReader from '../interfaces/config-reader';
import Provider from './provider';
export default class App {
    private provider;
    private reader;
    constructor(reader: ConfigReader);
    private findPreviousTier(target, tiers);
    getProvider(): Provider;
    setup(): Promise<AppConfig>;
    runLocal(): Promise<void>;
    runDeploy(): Promise<void>;
    runDetect(): Promise<void>;
}
export declare class AppConfigReader implements ConfigReader {
    private path;
    private defaultConfig;
    constructor(path?: string);
    safeConfig(input: any): any;
    read(additionalConfig?: any): Promise<AppConfig>;
}
