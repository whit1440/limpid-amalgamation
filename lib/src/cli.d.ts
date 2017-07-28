import App from './app/main';
export default class Hander {
    static CreateApp(argv: any): App;
    static RunLocal(argv: any): Promise<void>;
    static RunDetect(argv: any): Promise<void>;
    static RunDeploy(argv: any): Promise<void>;
}
