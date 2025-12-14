import { StatCard } from '@/components/shared/StatCard';
import { FileText, Send, MessageSquare, Trophy, XCircle, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  stats: {
    total: number;
    applied: number;
    oa: number;
    interview: number;
    offer: number;
    rejected: number;
    successRate: number;
    activeApplications: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        title="Total Applications"
        value={stats.total}
        icon={FileText}
        color="primary"
        delay={0}
      />
      <StatCard
        title="Applied"
        value={stats.applied}
        icon={Send}
        color="primary"
        delay={0.05}
      />
      <StatCard
        title="OA Stage"
        value={stats.oa}
        icon={MessageSquare}
        color="accent"
        delay={0.1}
      />
      <StatCard
        title="Interviews"
        value={stats.interview}
        icon={MessageSquare}
        color="warning"
        delay={0.15}
      />
      <StatCard
        title="Offers"
        value={stats.offer}
        icon={Trophy}
        color="success"
        delay={0.2}
      />
      <StatCard
        title="Success Rate"
        value={`${stats.successRate}%`}
        icon={TrendingUp}
        color="success"
        delay={0.25}
      />
    </div>
  );
}
