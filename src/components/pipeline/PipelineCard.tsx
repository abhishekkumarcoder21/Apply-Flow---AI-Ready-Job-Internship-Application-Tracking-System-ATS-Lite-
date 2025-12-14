import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Application } from '@/types/application';
import { format, parseISO } from 'date-fns';
import { GripVertical, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PipelineCardProps {
  application: Application;
  onEdit: (application: Application) => void;
}

export function PipelineCard({ application, onEdit }: PipelineCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: application.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "glass rounded-lg p-4 cursor-pointer hover:bg-card/80 transition-all",
        isDragging && "opacity-50 shadow-lg scale-105"
      )}
      onClick={() => onEdit(application)}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">
            {application.company_name}
          </h4>
          <p className="text-sm text-muted-foreground truncate">{application.role}</p>
          
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {format(parseISO(application.applied_date), 'MMM d')}
          </div>
        </div>
      </div>
    </div>
  );
}
