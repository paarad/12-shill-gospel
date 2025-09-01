import { create } from 'zustand';
import { PumpInput, Thread } from '@/lib/types';

interface PumpStore {
  // Input state
  input: PumpInput;
  
  // Generated content
  thread: Thread | null;
  
  // UI state
  isGenerating: boolean;
  exportStatus: 'idle' | 'exporting' | 'success' | 'error';
  
  // Actions
  updateInput: (updates: Partial<PumpInput>) => void;
  setThread: (thread: Thread) => void;
  setIsGenerating: (loading: boolean) => void;
  setExportStatus: (status: 'idle' | 'exporting' | 'success' | 'error') => void;
  reset: () => void;
}

const defaultInput: PumpInput = {
  mode: 'thread',
  ticker: '$COPE',
  persona: 'Insider Whale',
  narrative: 'AI',
  intensity: 5,
  length: 8,
  redFlags: [],
  seed: undefined
};

export const usePumpStore = create<PumpStore>((set) => ({
  input: defaultInput,
  thread: null,
  isGenerating: false,
  exportStatus: 'idle',
  
  updateInput: (updates) => set((state) => ({
    input: { ...state.input, ...updates }
  })),
  
  setThread: (thread) => set({ thread }),
  
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  setExportStatus: (exportStatus) => set({ exportStatus }),
  
  reset: () => set({
    input: defaultInput,
    thread: null,
    isGenerating: false,
    exportStatus: 'idle'
  })
}));
