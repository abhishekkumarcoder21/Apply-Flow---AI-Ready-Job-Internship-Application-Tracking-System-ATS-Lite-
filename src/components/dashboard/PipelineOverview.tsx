import { motion } from 'framer-motion';
import { STATUS_CONFIG, STATUSES, ApplicationStatus } from '@/types/application';
import { cn } from '@/lib/utils';

interface PipelineOverviewProps {
  stats: {
    applied: number;
    oa: number;
    interview: number;
    offer: number;
    rejected: number;
    total: number;
  };
}

export function PipelineOverview({ stats }: PipelineOverviewProps) {
  const getWidth = (count: number) => {
    if (stats.total === 0) return 0;
    return (count / stats.total) * 100;
  };

  const pipelineData: { status: ApplicationStatus; count: number }[] = [
    { status: 'applied', count: stats.applied },
    { status: 'oa', count: stats.oa },
    { status: 'interview', count: stats.interview },
    { status: 'offer', count: stats.offer },
    { status: 'rejected', count: stats.rejected },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Pipeline Overview</h3>

      <div className="space-y-4">
        {pipelineData.map(({ status, count }, index) => {
          const config = STATUS_CONFIG[status];
          const width = getWidth(count);

          return (
            <div key={status} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{config.label}</span>
                <span className="font-medium text-foreground">{count}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: config.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Pipeline Flow */}
      <div className="mt-8 flex items-center justify-between gap-2">
        {STATUSES.filter(s => s !== 'rejected').map((status, index) => {
          const config = STATUS_CONFIG[status];
          const count = stats[status as keyof typeof stats] as number;

          return (
            <div key={status} className="flex items-center flex-1">
              <div 
                className={cn(
                  "flex-1 flex flex-col items-center p-3 rounded-lg border transition-all",
                  config.bgClass
                )}
              >
                <span className="text-2xl font-bold">{count}</span>
                <span className="text-xs mt-1 opacity-80">{config.label}</span>
              </div>
              {index < 3 && (
                <div className="w-4 h-0.5 bg-border flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
