import { Moon, Sun, CheckSquare } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex items-center justify-between py-6 mb-8 border-b border-border">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <CheckSquare className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">FocusFlow</h1>
            </div>

            <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
        </header>
    );
}
