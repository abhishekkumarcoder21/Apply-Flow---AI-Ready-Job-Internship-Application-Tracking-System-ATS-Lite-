import { motion } from 'framer-motion';
import { Application } from '@/types/application';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { format, parseISO } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentActivityProps {
  applications: Application[];
}

export function RecentActivity({ applications }: RecentActivityProps) {
  const recentApps = applications.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Applications</h3>
        <Link 
          to="/applications"
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {recentApps.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No applications yet</p>
      ) : (
        <div className="space-y-3">
          {recentApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{app.company_name}</p>
                <p className="text-sm text-muted-foreground truncate">{app.role}</p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <StatusBadge status={app.status} size="sm" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {format(parseISO(app.applied_date), 'MMM d')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
