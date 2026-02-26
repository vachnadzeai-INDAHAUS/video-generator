import { create } from 'zustand';

export type JobStatus = 'idle' | 'queued' | 'running' | 'done' | 'error' | 'canceled';

export interface JobProgress {
  '9x16'?: number;
  '1x1'?: number;
  '4x5'?: number;
  '16x9'?: number;
}

interface GenerationState {
  status: JobStatus;
  jobId: string | null;
  progress: JobProgress;
  resultFiles: string[];
  errorMessage: string | null;
  // Actions
  setJob: (jobId: string, status: JobStatus) => void;
  updateStatus: (status: JobStatus, progress?: JobProgress, error?: string | null) => void;
  completeJob: (files: string[]) => void;
  clearJob: () => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  status: 'idle',
  jobId: null,
  progress: {},
  resultFiles: [],
  errorMessage: null,

  setJob: (jobId, status) => set({ jobId, status, progress: {}, resultFiles: [], errorMessage: null }),
  updateStatus: (status, progress, errorMessage) => set((state) => ({ 
    status, 
    progress: progress ? { ...state.progress, ...progress } : state.progress,
    errorMessage: errorMessage !== undefined ? errorMessage : state.errorMessage
  })),
  completeJob: (resultFiles) => set({ status: 'done', resultFiles, progress: { '9x16': 100, '1x1': 100, '4x5': 100, '16x9': 100 } }),
  clearJob: () => set({ status: 'idle', jobId: null, progress: {}, resultFiles: [], errorMessage: null }),
}));

export const useHasActiveJob = () => {
  const { status } = useGenerationStore();
  return status === 'queued' || status === 'running';
};
