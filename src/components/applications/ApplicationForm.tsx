import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Application, ApplicationFormData, STATUSES, STATUS_CONFIG } from '@/types/application';
import { format } from 'date-fns';

interface ApplicationFormProps {
  initialData?: Application;
  onSubmit: (data: ApplicationFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function ApplicationForm({ initialData, onSubmit, onCancel, loading }: ApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    company_name: initialData?.company_name || '',
    role: initialData?.role || '',
    location: initialData?.location || '',
    source: initialData?.source || '',
    status: initialData?.status || 'applied',
    applied_date: initialData?.applied_date || format(new Date(), 'yyyy-MM-dd'),
    follow_up_date: initialData?.follow_up_date || '',
    notes: initialData?.notes || '',
    salary_range: initialData?.salary_range || '',
    job_url: initialData?.job_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name *</Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
            placeholder="e.g., Google, Meta, Stripe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            placeholder="e.g., Software Engineer"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="e.g., San Francisco, Remote"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">Source</Label>
          <Input
            id="source"
            value={formData.source}
            onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
            placeholder="e.g., LinkedIn, Referral"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {STATUS_CONFIG[status].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="applied_date">Applied Date</Label>
          <Input
            id="applied_date"
            type="date"
            value={formData.applied_date}
            onChange={(e) => setFormData(prev => ({ ...prev, applied_date: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="follow_up_date">Follow-up Date</Label>
          <Input
            id="follow_up_date"
            type="date"
            value={formData.follow_up_date}
            onChange={(e) => setFormData(prev => ({ ...prev, follow_up_date: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary_range">Salary Range</Label>
          <Input
            id="salary_range"
            value={formData.salary_range}
            onChange={(e) => setFormData(prev => ({ ...prev, salary_range: e.target.value }))}
            placeholder="e.g., $150k-$200k"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="job_url">Job URL</Label>
        <Input
          id="job_url"
          type="url"
          value={formData.job_url}
          onChange={(e) => setFormData(prev => ({ ...prev, job_url: e.target.value }))}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Add any relevant notes about this application..."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="hero" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update Application' : 'Add Application'}
        </Button>
      </div>
    </form>
  );
}
