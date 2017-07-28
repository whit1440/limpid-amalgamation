export default interface AppConfig {
    api: ApiConfig;
    scm: ScmConfig;
    logger: LogConfig;
    deploy: DeployConfig;
}
export interface DeployConfig {
    tiers?: Array<string>;
    targetTier?: string;
    previousTier?: string;
    sprintSchedule?: string;
    sprintName?: string;
}
export interface LogConfig {
    level: number;
}
export interface ScmConfig {
    path: string;
    story: RegExp | string;
    merge: RegExp | string;
    feature: RegExp | string;
    release: RegExp | string;
}
export interface ApiConfig {
    protocol: string;
    host: string;
    path?: string;
    authToken: string;
    headers: Map<string, string> | any;
    schedule: string;
    noPost?: boolean;
    crossOrigin?: boolean;
}
