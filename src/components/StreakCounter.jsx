import { Flame } from 'lucide-react';
import { cn } from '../utils/cn';

export function StreakCounter({ current, longest }) {
    const hasStreak = current > 0;

    return (
        <div className={cn(
            "flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300",
            hasStreak
                ? "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400"
                : "bg-muted/50 border-border text-muted-foreground"
        )}>
            <div className={cn(
                "p-3 rounded-full transition-colors",
                hasStreak ? "bg-orange-500/20" : "bg-muted"
            )}>
                <Flame className={cn("w-6 h-6", hasStreak && "animate-pulse")} />
            </div>

            <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">Current Streak</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold">{current}</span>
                    <span className="text-sm font-medium opacity-70">days</span>
                </div>
                {longest > 0 && (
                    <span className="text-[10px] mt-1 opacity-70 font-semibold uppercase tracking-wider">Longest: {longest} days</span>
                )}
            </div>
        </div>
    );
}
