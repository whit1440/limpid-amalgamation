import App from './app/main';
export default class Hander {
    static CreateApp(argv: any): App;
    static RunLocal(argv: any): void;
    static RunDetect(argv: any): void;
    static RunDeploy(argv: any): void;
}
