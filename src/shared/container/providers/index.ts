import IDateProvider from '@shared/container/providers/date-provider/date-provider.interface';
import DayJsDateProvider from '@shared/container/providers/date-provider/implementations/dayjs.date-provider';
import { container } from 'tsyringe';

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider,
);
