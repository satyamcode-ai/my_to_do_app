import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isToday, parseISO, isSameDay, subMonths, addMonths } from 'date-fns';
import { CalendarDay } from './CalendarDay';
import { useState } from 'react';

export function Calendar({ completions = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);

    // We want to start the grid on Sunday
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(monthEnd);
    if (endDate.getDay() !== 6) {
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    }

    const dateInterval = eachDayOfInterval({ start: startDate, end: endDate });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const completedDates = completions.map(ts => parseISO(ts));

    return (
        <div className="bg-card w-full border border-border rounded-3xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <CalendarIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Productivity Heatmap</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-semibold w-24 text-center">
                        {format(currentDate, 'MMMM yyyy')}
                    </span>
                    <button
                        onClick={nextMonth}
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Next month"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 lg:gap-2">
                {dateInterval.map((day, i) => {
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const tasksCompleted = completedDates.filter(d => isSameDay(d, day)).length;

                    return (
                        <CalendarDay
                            key={i}
                            date={day}
                            isCurrentMonth={isCurrentMonth}
                            tasksCompleted={tasksCompleted}
                            isToday={isToday(day)}
                        />
                    );
                })}
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-muted/50 border border-border"></div>
                    <div className="w-3 h-3 rounded-sm bg-success/30"></div>
                    <div className="w-3 h-3 rounded-sm bg-success/60"></div>
                    <div className="w-3 h-3 rounded-sm bg-success"></div>
                </div>
                <span>More</span>
            </div>
        </div>
    );
}
