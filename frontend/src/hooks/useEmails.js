import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const emailKeys = {
  all: ['emails'],
  inbox: (filter) => ['emails', 'inbox', filter],
  thread: (id) => ['emails', 'thread', id],
  message: (id) => ['emails', 'message', id],
  search: (q) => ['emails', 'search', q],
};

// ─── Inbox ────────────────────────────────────────────────────────────────────
export const useInbox = (filter = 'all') => {
  return useInfiniteQuery({
    queryKey: emailKeys.inbox(filter),
    queryFn: async ({ pageParam }) => {
      const params = { filter, maxResults: 20 };
      if (pageParam) params.pageToken = pageParam;
      const res = await api.get('/api/emails', { params });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: undefined,
    staleTime: 60_000,
  });
};

// ─── Single Email / Thread ────────────────────────────────────────────────────
export const useEmail = (id, type = 'thread') => {
  return useQuery({
    queryKey: type === 'thread' ? emailKeys.thread(id) : emailKeys.message(id),
    queryFn: async () => {
      const res = await api.get(`/api/emails/${id}`, { params: { type } });
      return res.data;
    },
    enabled: !!id,
  });
};

// ─── Search ───────────────────────────────────────────────────────────────────
export const useSearchEmails = (query) => {
  return useQuery({
    queryKey: emailKeys.search(query),
    queryFn: async () => {
      const res = await api.get('/api/emails/search', { params: { q: query } });
      return res.data;
    },
    enabled: !!query && query.length > 1,
    staleTime: 30_000,
  });
};

// ─── Send Email ───────────────────────────────────────────────────────────────
export const useSendEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (emailData) => api.post('/api/emails/send', emailData),
    onSuccess: () => {
      toast.success('Email sent successfully!');
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to send email'),
  });
};

// ─── Reply ────────────────────────────────────────────────────────────────────
export const useReplyEmail = (emailId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (replyData) => api.post(`/api/emails/${emailId}/reply`, replyData),
    onSuccess: () => {
      toast.success('Reply sent!');
      queryClient.invalidateQueries({ queryKey: emailKeys.thread(emailId) });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to send reply'),
  });
};

// ─── Star ─────────────────────────────────────────────────────────────────────
export const useToggleStar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, starred }) => api.patch(`/api/emails/${id}/star`, { starred }),
    onSuccess: (_, { starred }) => {
      toast.success(starred ? 'Email starred' : 'Star removed');
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
    onError: () => toast.error('Failed to update star'),
  });
};

// ─── Read/Unread ──────────────────────────────────────────────────────────────
export const useToggleRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, read }) => api.patch(`/api/emails/${id}/read`, { read }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: emailKeys.all }),
    onError: () => toast.error('Failed to update read status'),
  });
};

// ─── Archive ──────────────────────────────────────────────────────────────────
export const useArchiveEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.patch(`/api/emails/${id}/archive`),
    onSuccess: () => {
      toast.success('Email archived');
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
    },
    onError: () => toast.error('Failed to archive email'),
  });
};

// ─── Delete (Trash) ───────────────────────────────────────────────────────────
export const useTrashEmail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id) => api.delete(`/api/emails/${id}`),
    onSuccess: () => {
      toast.success('Email moved to trash');
      queryClient.invalidateQueries({ queryKey: emailKeys.all });
      navigate('/dashboard');
    },
    onError: () => toast.error('Failed to delete email'),
  });
};

// ─── Analytics ────────────────────────────────────────────────────────────────
export const useAnalytics = (days = 30) => {
  return useQuery({
    queryKey: ['analytics', days],
    queryFn: async () => {
      const res = await api.get('/api/analytics', { params: { days } });
      return res.data;
    },
    staleTime: 5 * 60_000,
  });
};

// ─── Templates ────────────────────────────────────────────────────────────────
export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const res = await api.get('/api/templates');
      return res.data.templates;
    },
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/api/templates', data),
    onSuccess: () => {
      toast.success('Template saved!');
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
    onError: () => toast.error('Failed to save template'),
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/api/templates/${id}`),
    onSuccess: () => {
      toast.success('Template deleted');
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
};
