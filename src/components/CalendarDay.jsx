import { cn } from '../utils/cn';
import { format } from 'date-fns';

export function CalendarDay({ date, isCurrentMonth, tasksCompleted, isToday }) {
    // Determine heatmap color based on tasks completed
    let heatClass = "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50";

    if (tasksCompleted > 0) {
        if (tasksCompleted === 1) {
            heatClass = "bg-success/30 border-success/20 text-success-foreground font-medium hover:bg-success/40";
        } else if (tasksCompleted <= 3) {
            heatClass = "bg-success/60 border-success/40 text-success-foreground font-semibold hover:bg-success/70";
        } else {
            heatClass = "bg-success border-success text-white font-bold shadow-sm hover:bg-success/90";
        }
    }

    if (!isCurrentMonth) {
        // Dim styling for days outside current month
        heatClass = cn(heatClass, "opacity-30");
    }

    return (
        <div
            className={cn(
                "relative aspect-square flex items-center justify-center rounded-xl border transition-all duration-300 hover:scale-[1.05] hover:z-10 cursor-default group",
                heatClass,
                isToday && !tasksCompleted && "border-primary text-primary font-bold shadow-sm ring-1 ring-primary/20",
                isToday && tasksCompleted > 0 && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
            title={`${format(date, 'MMM d, yyyy')}: ${tasksCompleted} tasks completed`}
        >
            <span className="text-sm">
                {format(date, 'd')}
            </span>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                {tasksCompleted} {tasksCompleted === 1 ? 'task' : 'tasks'}
            </div>
        </div>
    );
}
