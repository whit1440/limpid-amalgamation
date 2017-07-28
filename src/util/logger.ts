export default class Logger {
  private LEVEL: number
  constructor(level: number) {
    this.LEVEL = level
  }
  INFO() {
    this.LEVEL > 0 && console.log.apply(console, arguments)
  }
  WARN() {
    this.LEVEL > 1 && console.log.apply(console, arguments)
  }
  DEBUG() {
    this.LEVEL > 2 && console.log.apply(console, arguments)
  }
}
