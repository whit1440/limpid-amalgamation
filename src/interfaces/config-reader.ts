import AppConfig from './app-config'
export default interface ConfigReader {
  read(): Promise<AppConfig>
}
