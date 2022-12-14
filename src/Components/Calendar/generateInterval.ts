import { eachDayOfInterval, format, parseISO } from "date-fns";

import { DayProps, MarkedDateProps } from ".";
import { getPlatformDate } from "../../utils/getPlatformDate";
import theme from "../../global/styles/theme";

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({ start: start.timestamp, end: end.timestamp })
    .forEach(item => {
      const date = format(getPlatformDate(item), 'yyyy-MM-dd');

      interval = {
        ...interval,
        [date]: {
          color: start.dateString === date || end.dateString === date 
          ? theme.colors.main : theme.colors.main_light,

          textColor: start.dateString === date || end.dateString === date 
          ? theme.colors.main_light : theme.colors.main,
        }
      }
    })

  return interval;
}