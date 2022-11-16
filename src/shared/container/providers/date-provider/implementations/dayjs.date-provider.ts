import IDateProvider from '@shared/container/providers/date-provider/date-provider.interface';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export class DayJsDateProvider implements IDateProvider {
  now(): Date {
    return dayjs().toDate();
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUtc(endDate);
    return dayjs(endDateUtc).diff(startDate, 'hours');
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}

export default DayJsDateProvider;
