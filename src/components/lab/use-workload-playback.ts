'use client';
import { useEffect, useReducer, useState } from 'react';
import { defaultWorkload } from '@/content/lab/workload-fixtures';
import { createWorkload, workloadReducer } from '@/lib/lab/workload-engine';
export function useWorkloadPlayback() {
  const [state, dispatch] = useReducer(workloadReducer, defaultWorkload, createWorkload);
  const [speed, setSpeed] = useState(2);
  useEffect(() => {
    if (state.status !== 'running') return;
    const timer = window.setInterval(() => dispatch({ type: 'tick' }), 1000 / speed);
    const pauseHidden = () => {
      if (document.hidden) dispatch({ type: 'pause' });
    };
    document.addEventListener('visibilitychange', pauseHidden);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', pauseHidden);
    };
  }, [state.status, speed]);
  return { state, dispatch, speed, setSpeed };
}
