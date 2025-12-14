import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Application, ApplicationFormData, ApplicationStatus } from '@/types/application';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchApplications = async () => {
    if (!user) {
      setApplications([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setApplications(data as Application[]);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const addApplication = async (data: ApplicationFormData) => {
    if (!user) return null;

    try {
      const { data: newApp, error } = await supabase
        .from('applications')
        .insert({
          ...data,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setApplications(prev => [newApp as Application, ...prev]);
      toast({
        title: "Success",
        description: "Application added successfully",
      });

      return newApp;
    } catch (error) {
      console.error('Error adding application:', error);
      toast({
        title: "Error",
        description: "Failed to add application",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateApplication = async (id: string, data: Partial<ApplicationFormData>) => {
    try {
      const { data: updatedApp, error } = await supabase
        .from('applications')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setApplications(prev => 
        prev.map(app => app.id === id ? updatedApp as Application : app)
      );

      toast({
        title: "Success",
        description: "Application updated successfully",
      });

      return updatedApp;
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateApplicationStatus = async (id: string, status: ApplicationStatus) => {
    return updateApplication(id, { status });
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApplications(prev => prev.filter(app => app.id !== id));
      toast({
        title: "Success",
        description: "Application deleted successfully",
      });

      return true;
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      });
      return false;
    }
  };

  const getStats = () => {
    const total = applications.length;
    const applied = applications.filter(a => a.status === 'applied').length;
    const oa = applications.filter(a => a.status === 'oa').length;
    const interview = applications.filter(a => a.status === 'interview').length;
    const offer = applications.filter(a => a.status === 'offer').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;

    const successRate = total > 0 ? Math.round((offer / total) * 100) : 0;
    const activeApplications = applied + oa + interview;

    return { total, applied, oa, interview, offer, rejected, successRate, activeApplications };
  };

  return {
    applications,
    loading,
    addApplication,
    updateApplication,
    updateApplicationStatus,
    deleteApplication,
    refetch: fetchApplications,
    stats: getStats(),
  };
}
