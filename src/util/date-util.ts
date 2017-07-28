export default class DateUtil {
  static calenderDateToISO(ymd: string): Date {
    let timezone = DateUtil.getLocalTimezone()
    return new Date(`${ymd}T00:00:00.000-${timezone}`)
  }
  static getLocalTimezone(): string {
    let hours: number = (((new Date()).getTimezoneOffset() / 60) * 100)
    return (hours < 1000) ? '0' + hours : hours.toString()
  }
  static getRelativePreviousDate(daysBack = 1) {
    let daysBackInMs = 24 * 60 * 60 * 1000 * daysBack;
    let now = (new Date()).getTime()
    return new Date(now - daysBackInMs)
  }
}
