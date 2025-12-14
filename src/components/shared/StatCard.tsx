import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: number;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'destructive';
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, color = 'primary', delay = 0 }: StatCardProps) {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 border-primary/20',
    accent: 'from-accent/20 to-accent/5 border-accent/20',
    success: 'from-status-offer/20 to-status-offer/5 border-status-offer/20',
    warning: 'from-status-interview/20 to-status-interview/5 border-status-interview/20',
    destructive: 'from-destructive/20 to-destructive/5 border-destructive/20',
  };

  const iconClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-status-offer',
    warning: 'text-status-interview',
    destructive: 'text-destructive',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br p-6",
        colorClasses[color]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {trend !== undefined && (
            <p className={cn(
              "mt-1 text-sm font-medium",
              trend >= 0 ? "text-status-offer" : "text-destructive"
            )}>
              {trend >= 0 ? '+' : ''}{trend}% from last week
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-lg bg-background/50", iconClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div className={cn(
        "absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl opacity-20",
        color === 'primary' && "bg-primary",
        color === 'accent' && "bg-accent",
        color === 'success' && "bg-status-offer",
        color === 'warning' && "bg-status-interview",
        color === 'destructive' && "bg-destructive"
      )} />
    </motion.div>
  );
}
