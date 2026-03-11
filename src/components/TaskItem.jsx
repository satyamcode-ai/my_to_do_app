import { Check, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

export function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className={cn(
            "group flex items-center gap-3 p-4 rounded-2xl bg-card border mb-3 transition-all duration-300 hover:border-primary/50 shadow-sm",
            task.completed ? "border-success/30 bg-success/5" : "border-border"
        )}>
            <button
                onClick={() => onToggle(task.id)}
                className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                    task.completed
                        ? "bg-success border-success text-white"
                        : "border-muted-foreground hover:border-primary"
                )}
            >
                <Check className={cn("w-4 h-4 transition-transform duration-300", task.completed ? "scale-100" : "scale-0")} />
            </button>

            <div className="flex-1 min-w-0">
                <p className={cn(
                    "text-base transition-all duration-300 truncate",
                    task.completed ? "line-through text-muted-foreground opacity-70" : "text-foreground font-medium"
                )}>
                    {task.title}
                </p>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-destructive"
                aria-label="Delete task"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
}
