import ConfigReader from '../../src/interfaces/config-reader';
import AppConfig from '../../src/interfaces/app-config';
export default class ConfigReaderStub implements ConfigReader {
    defaultConfig: {
        "api": {
            "protocol": string;
            "headers": {
                "Accept": string;
                "Content-Type": string;
                "Origin": string;
            };
            "noPost": boolean;
            "crossOrigin": boolean;
        };
        "scm": {
            "path": string;
            "story": string;
            "merge": string;
            "feature": string;
            "release": string;
        };
        "logger": {
            "level": number;
        };
        "deploy": {
            "tiers": string[];
            "sprintSchedule": string;
        };
    };
    inputConfig: {
        "api": {
            "host": string;
            "path": string;
            "authToken": string;
            "schedule": string;
        };
        "scm": {
            "path": string;
            "story": string;
            "merge": string;
            "feature": string;
            "release": string;
        };
        "logger": {
            "level": number;
        };
        "deploy": {
            "tiers": string[];
            "sprintSchedule": string;
        };
    };
    read(): Promise<AppConfig>;
}
