import { motion } from 'framer-motion';
import { Application } from '@/types/application';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { 
  MapPin, 
  Calendar, 
  ExternalLink, 
  MoreVertical,
  Pencil,
  Trash2,
  Bell
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
  index?: number;
}

export function ApplicationCard({ application, onEdit, onDelete, index = 0 }: ApplicationCardProps) {
  const isFollowUpSoon = application.follow_up_date && 
    new Date(application.follow_up_date) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative glass rounded-xl p-5 hover:bg-card/80 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-foreground truncate">
              {application.company_name}
            </h3>
            <StatusBadge status={application.status} size="sm" />
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{application.role}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {application.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {application.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(parseISO(application.applied_date), 'MMM d, yyyy')}
            </span>
            {isFollowUpSoon && application.follow_up_date && (
              <span className="flex items-center gap-1 text-status-interview">
                <Bell className="w-3 h-3" />
                Follow up {format(parseISO(application.follow_up_date), 'MMM d')}
              </span>
            )}
          </div>

          {application.notes && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {application.notes}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {application.job_url && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-8 w-8"
            >
              <a href={application.job_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(application)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(application.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
