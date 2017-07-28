export default class DefaultConfig {
    static config: {
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
}
