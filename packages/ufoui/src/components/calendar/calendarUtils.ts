export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
}

export const isSameDay = (d1: Date, d2: Date): boolean => {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

export const isSameMonth = (d1: Date, d2: Date): boolean => {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
};

export const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date());
};

export const startOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const endOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const startOfWeek = (date: Date, weekStartsOn = 1): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

export const endOfWeek = (date: Date, weekStartsOn = 1): Date => {
    const d = startOfWeek(date, weekStartsOn);
    d.setDate(d.getDate() + 6);
    d.setHours(23, 59, 59, 999);
    return d;
};

export const addMonths = (date: Date, months: number): Date => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
};

export const addDays = (date: Date, days: number): Date => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
};

export const getMonthDays = (viewDate: Date, selectedDate?: Date): CalendarDay[] => {
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, 1);
    const endDate = endOfWeek(monthEnd, 1);

    const days: CalendarDay[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        days.push({
            date: new Date(current),
            isCurrentMonth: isSameMonth(current, monthStart),
            isToday: isToday(current),
            isSelected: !!selectedDate && isSameDay(current, selectedDate),
        });
        current.setDate(current.getDate() + 1);
    }

    return days;
};

export const getWeekDaysShort = (): string[] => {
    // Mon, Tue, Wed, Thu, Fri, Sat, Sun (starts Monday)
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
};

export const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
