export interface IDateProvider {
  now(): Date;
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUtc(date: Date): string;
}

export default IDateProvider;
