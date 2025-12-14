import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { PipelineOverview } from '@/components/dashboard/PipelineOverview';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { UpcomingFollowUps } from '@/components/dashboard/UpcomingFollowUps';
import { useApplications } from '@/hooks/useApplications';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { applications, loading, stats } = useApplications();
  const { user } = useAuth();

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton className="h-80 rounded-xl" />
            <Skeleton className="h-80 rounded-xl" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Hey {firstName} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your job search progress
            </p>
          </div>
          
          <Button variant="hero" asChild>
            <Link to="/applications?new=true">
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </Link>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          <PipelineOverview stats={stats} />
          <UpcomingFollowUps applications={applications} />
        </div>

        {/* Recent Activity */}
        <RecentActivity applications={applications} />
      </div>
    </AppLayout>
  );
}
