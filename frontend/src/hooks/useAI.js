import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../services/api';

const aiMutation = (endpoint, successMsg) => ({
  mutationFn: (data) => api.post(`/api/ai/${endpoint}`, data).then(r => r.data),
  onError: (err) => toast.error(err.response?.data?.message || `AI ${endpoint} failed`),
});

export const useSummarize = () => useMutation(aiMutation('summarize'));
export const useGenerateReply = () => useMutation(aiMutation('reply'));
export const useToneReply = () => useMutation(aiMutation('tone-reply'));
export const useClassify = () => useMutation(aiMutation('classify'));
export const useExplain = () => useMutation(aiMutation('explain'));
export const useExtractActions = () => useMutation(aiMutation('extract-actions'));
export const useDetectSpam = () => useMutation(aiMutation('detect-spam'));
export const useDetectPriority = () => useMutation(aiMutation('detect-priority'));
export const useGrammarCorrect = () => useMutation(aiMutation('grammar'));
export const useSuggestSubject = () => useMutation(aiMutation('suggest-subject'));
