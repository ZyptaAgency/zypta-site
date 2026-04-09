'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import SiteLoader from './SiteLoader';

type ReplayPayload = { id: number; onComplete?: () => void };

type SiteLoaderCtx = {
  playHomeLoader: (onComplete?: () => void) => void;
};

const SiteLoaderContext = createContext<SiteLoaderCtx | null>(null);

export function useSiteLoader() {
  const ctx = useContext(SiteLoaderContext);
  if (!ctx) throw new Error('useSiteLoader must be used within SiteLoaderProvider');
  return ctx;
}

export function SiteLoaderProvider({ children }: { children: ReactNode }) {
  const [replayRequest, setReplayRequest] = useState<ReplayPayload | null>(null);

  const playHomeLoader = useCallback((onComplete?: () => void) => {
    setReplayRequest({ id: Date.now(), onComplete });
  }, []);

  const onReplayConsumed = useCallback(() => setReplayRequest(null), []);

  return (
    <SiteLoaderContext.Provider value={{ playHomeLoader }}>
      {children}
      <SiteLoader replayRequest={replayRequest} onReplayConsumed={onReplayConsumed} />
    </SiteLoaderContext.Provider>
  );
}
