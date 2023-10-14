import { parseISO, format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { pl } from 'date-fns/locale'

export const formatDate = (date) => {
    const dateISO = parseISO(date)
    const timeZone = 'Europe/Warsaw'
    const zonedDate = utcToZonedTime(dateISO, timeZone)
    const formattedDate = format(zonedDate, 'PPpp', { locale: pl })
    return formattedDate
}
