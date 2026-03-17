export function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

export const THEME_COLORS = {
    bg: 'bg-slate-950',
    text: 'text-slate-200',
    border: 'border-slate-800',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    danger: 'text-red-500',
    warning: 'text-amber-500',
    success: 'text-emerald-500',
};
