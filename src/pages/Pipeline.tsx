import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { PipelineColumn } from '@/components/pipeline/PipelineColumn';
import { ApplicationForm } from '@/components/applications/ApplicationForm';
import { EmptyState } from '@/components/shared/EmptyState';
import { useApplications } from '@/hooks/useApplications';
import { Application, ApplicationFormData, ApplicationStatus, STATUSES } from '@/types/application';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Kanban } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PipelineCard } from '@/components/pipeline/PipelineCard';

export default function Pipeline() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { applications, loading, addApplication, updateApplication, updateApplicationStatus } = useApplications();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getApplicationsByStatus = (status: ApplicationStatus) => {
    return applications.filter(app => app.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const applicationId = active.id as string;
    const newStatus = over.id as ApplicationStatus;

    const application = applications.find(app => app.id === applicationId);
    if (application && application.status !== newStatus) {
      await updateApplicationStatus(applicationId, newStatus);
    }
  };

  const handleEdit = (application: Application) => {
    setEditingApplication(application);
    setIsDialogOpen(true);
  };

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

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingApplication(null);
  };

  const activeApplication = activeId 
    ? applications.find(app => app.id === activeId) 
    : null;

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {STATUSES.map((status) => (
              <Skeleton key={status} className="h-96 w-72 rounded-xl flex-shrink-0" />
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
            <h1 className="text-3xl font-bold text-foreground">Pipeline</h1>
            <p className="text-muted-foreground mt-1">
              Drag and drop to update application status
            </p>
          </div>
          
          <Button variant="hero" onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </motion.div>

        {/* Pipeline Board */}
        {applications.length === 0 ? (
          <EmptyState
            icon={Kanban}
            title="Your pipeline is empty"
            description="Add your first application to start tracking your job search progress."
            action={{
              label: "Add Your First Application",
              onClick: () => setIsDialogOpen(true),
            }}
          />
        ) : (
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-6 overflow-x-auto pb-4"
            >
              {STATUSES.map((status) => (
                <PipelineColumn
                  key={status}
                  status={status}
                  applications={getApplicationsByStatus(status)}
                  onEdit={handleEdit}
                />
              ))}
            </motion.div>

            <DragOverlay>
              {activeApplication && (
                <div className="opacity-80">
                  <PipelineCard 
                    application={activeApplication} 
                    onEdit={() => {}} 
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>
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
