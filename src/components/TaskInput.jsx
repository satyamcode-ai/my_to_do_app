import { useState } from 'react';
import { Plus } from 'lucide-react';

export function TaskInput({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 relative">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full pl-6 pr-14 py-4 rounded-2xl bg-card border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-lg placeholder:text-muted-foreground"
            />
            <button
                type="submit"
                disabled={!title.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                aria-label="Add task"
            >
                <Plus className="w-5 h-5" />
            </button>
        </form>
    );
}
