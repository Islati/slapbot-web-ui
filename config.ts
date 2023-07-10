/*
Configuration class design choice to allow computed config variables.
 */

interface AppConfig {
    API_BASE_URL: string;
}

let Config: AppConfig;
Config = class Config {
    static API_BASE_URL: string = "http://127.0.0.1:5000"
}

export default Config;