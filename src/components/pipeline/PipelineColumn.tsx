import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Application, ApplicationStatus, STATUS_CONFIG } from '@/types/application';
import { PipelineCard } from './PipelineCard';
import { cn } from '@/lib/utils';

interface PipelineColumnProps {
  status: ApplicationStatus;
  applications: Application[];
  onEdit: (application: Application) => void;
}

export function PipelineColumn({ status, applications, onEdit }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const config = STATUS_CONFIG[status];

  return (
    <div className="flex flex-col w-72 flex-shrink-0">
      <div className="flex items-center gap-2 mb-4 px-1">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: config.color }}
        />
        <h3 className="font-semibold text-foreground">{config.label}</h3>
        <span className="ml-auto text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
          {applications.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-3 p-2 rounded-xl min-h-[200px] transition-colors",
          isOver ? "bg-primary/10 border-2 border-dashed border-primary/30" : "bg-secondary/30"
        )}
      >
        <SortableContext items={applications.map(a => a.id)} strategy={verticalListSortingStrategy}>
          {applications.map((application) => (
            <PipelineCard 
              key={application.id} 
              application={application} 
              onEdit={onEdit}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
