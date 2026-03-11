import { cn } from '../utils/cn';

export function TaskFilters({ filter, setFilter, counts }) {
    const filters = [
        { id: 'all', label: 'All Tasks', count: counts.all },
        { id: 'pending', label: 'Pending', count: counts.pending },
        { id: 'completed', label: 'Completed', count: counts.completed }
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-6 cursor-pointer">
            {filters.map(f => (
                <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                        filter === f.id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                >
                    {f.label}
                    <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-bold font-mono",
                        filter === f.id ? "bg-primary-foreground/20" : "bg-card border border-border"
                    )}>
                        {f.count}
                    </span>
                </button>
            ))}
        </div>
    );
}
