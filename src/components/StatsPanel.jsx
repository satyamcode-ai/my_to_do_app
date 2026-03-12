import { CheckCircle2, Target } from 'lucide-react';
import { StreakCounter } from './StreakCounter';
import { isToday, parseISO } from 'date-fns';

export function StatsPanel({ tasks, streak }) {
    const completedToday = tasks.filter(t => t.completed).length;

    const totalPossibleCompletions = tasks.length;
    const completionRate = totalPossibleCompletions > 0
        ? Math.round((completedToday / totalPossibleCompletions) * 100)
        : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StreakCounter current={streak.current} longest={streak.longest} />

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Completed Today</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-foreground">{completedToday}</span>
                        <span className="text-sm font-medium text-muted-foreground">tasks</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
                <div className="p-3 rounded-full bg-success/10 text-success">
                    <Target className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Completion Rate</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-foreground">{completionRate}%</span>
                    </div>
                    <span className="text-[10px] mt-1 text-muted-foreground font-semibold uppercase tracking-wider">Of {tasks.length} total tasks</span>
                </div>
            </div>
        </div>
    );
}
