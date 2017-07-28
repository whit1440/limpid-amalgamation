export default class DateUtil {
    static calenderDateToISO(ymd: string): Date;
    static getLocalTimezone(): string;
    static getRelativePreviousDate(daysBack?: number): Date;
}
