import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { ApplicationCard } from '@/components/applications/ApplicationCard';
import { ApplicationForm } from '@/components/applications/ApplicationForm';
import { EmptyState } from '@/components/shared/EmptyState';
import { useApplications } from '@/hooks/useApplications';
import { Application, ApplicationFormData, STATUSES, STATUS_CONFIG } from '@/types/application';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, FileText, Filter } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export default function Applications() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(searchParams.get('new') === 'true');
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { applications, loading, addApplication, updateApplication, deleteApplication } = useApplications();

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setIsDialogOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      if (editingApplication) {
        await updateApplication(editingApplication.id, data);
      } else {
        await addApplication(data);
      }
      setIsDialogOpen(false);
      setEditingApplication(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (application: Application) => {
    setEditingApplication(application);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      await deleteApplication(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingApplication(null);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Applications</h1>
            <p className="text-muted-foreground mt-1">
              {applications.length} total applications
            </p>
          </div>
          
          <Button variant="hero" onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company or role..."
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {STATUS_CONFIG[status].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          applications.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No applications yet"
              description="Start tracking your job applications by adding your first one."
              action={{
                label: "Add Your First Application",
                onClick: () => setIsDialogOpen(true),
              }}
            />
          ) : (
            <EmptyState
              icon={Search}
              title="No results found"
              description="Try adjusting your search or filter to find what you're looking for."
            />
          )
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredApplications.map((application, index) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingApplication ? 'Edit Application' : 'Add New Application'}
              </DialogTitle>
            </DialogHeader>
            <ApplicationForm
              initialData={editingApplication || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCloseDialog}
              loading={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
