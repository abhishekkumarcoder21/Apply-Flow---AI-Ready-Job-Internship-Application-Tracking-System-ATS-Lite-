import { motion } from 'framer-motion';
import { Application } from '@/types/application';
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';
import { Bell, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpcomingFollowUpsProps {
  applications: Application[];
}

export function UpcomingFollowUps({ applications }: UpcomingFollowUpsProps) {
  const now = new Date();
  const upcoming = applications
    .filter(app => app.follow_up_date && isAfter(parseISO(app.follow_up_date), now))
    .sort((a, b) => parseISO(a.follow_up_date!).getTime() - parseISO(b.follow_up_date!).getTime())
    .slice(0, 5);

  const overdue = applications
    .filter(app => 
      app.follow_up_date && 
      isBefore(parseISO(app.follow_up_date), now) &&
      app.status !== 'offer' && 
      app.status !== 'rejected'
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Upcoming Follow-ups</h3>
        {overdue.length > 0 && (
          <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-destructive/20 text-destructive">
            {overdue.length} overdue
          </span>
        )}
      </div>

      {upcoming.length === 0 && overdue.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No follow-ups scheduled</p>
      ) : (
        <div className="space-y-3">
          {overdue.slice(0, 2).map((app) => (
            <div
              key={app.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
            >
              <Calendar className="w-4 h-4 text-destructive" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{app.company_name}</p>
                <p className="text-sm text-destructive">
                  Overdue: {format(parseISO(app.follow_up_date!), 'MMM d')}
                </p>
              </div>
            </div>
          ))}

          {upcoming.map((app) => {
            const isUrgent = isBefore(parseISO(app.follow_up_date!), addDays(now, 3));
            
            return (
              <div
                key={app.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  isUrgent ? "bg-status-interview/10 border border-status-interview/20" : "bg-secondary/30"
                )}
              >
                <Calendar className={cn(
                  "w-4 h-4",
                  isUrgent ? "text-status-interview" : "text-muted-foreground"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{app.company_name}</p>
                  <p className={cn(
                    "text-sm",
                    isUrgent ? "text-status-interview" : "text-muted-foreground"
                  )}>
                    {format(parseISO(app.follow_up_date!), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
