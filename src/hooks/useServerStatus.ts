import { useEffect, useState } from 'react';
import { SERVER_CONFIG } from '../config/server';

export interface LiveServerState {
  online: boolean;
  players: number;
  maxPlayers: number;
  queue: number;
  map: string;
  inGameTime: string;
  weather: string;
  pingRegion: string;
  perspective: string;
  timeScale: string;
  lastWipe: string;
  isLiveApi: boolean;
  loading: boolean;
}

export function useServerStatus(): LiveServerState {
  const [state, setState] = useState<LiveServerState>({
    ...SERVER_CONFIG.telemetryFallback,
    isLiveApi: false,
    loading: Boolean(SERVER_CONFIG.connection.battlemetricsId),
  });

  useEffect(() => {
    const bmId = SERVER_CONFIG.connection.battlemetricsId.trim();
    if (!bmId) return;

    let cancelled = false;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.battlemetrics.com/servers/${bmId}`);
        if (!res.ok) throw new Error('BattleMetrics unavailable');
        const json = await res.json();
        const attrs = json?.data?.attributes;
        if (!attrs || cancelled) return;

        setState((prev) => ({
          ...prev,
          online: attrs.status === 'online',
          players: typeof attrs.players === 'number' ? attrs.players : prev.players,
          maxPlayers: typeof attrs.maxPlayers === 'number' ? attrs.maxPlayers : prev.maxPlayers,
          queue: typeof attrs.details?.queue === 'number' ? attrs.details.queue : prev.queue,
          map: attrs.details?.map || prev.map,
          inGameTime: attrs.details?.time || prev.inGameTime,
          isLiveApi: true,
          loading: false,
        }));
      } catch {
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, isLiveApi: false }));
        }
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return state;
}

/** Вычисляет обратный отсчёт до следующего планового рестарта по МСК (UTC+3) */
export function useRestartCountdown(restartHoursMSK: number[]): {
  countdown: string;
  nextRestartLabel: string;
} {
  const compute = () => {
    const now = new Date();
    // Переводим текущее время в UTC+3 (Москва)
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
    const mskNow = new Date(utcMs + 3 * 3600_000);

    const sorted = [...restartHoursMSK].sort((a, b) => a - b);
    let target = new Date(mskNow);
    let chosenHour = sorted[0];
    let foundToday = false;

    for (const h of sorted) {
      const candidate = new Date(mskNow);
      candidate.setHours(h, 0, 0, 0);
      if (candidate.getTime() > mskNow.getTime()) {
        target = candidate;
        chosenHour = h;
        foundToday = true;
        break;
      }
    }

    if (!foundToday) {
      target.setDate(target.getDate() + 1);
      target.setHours(sorted[0], 0, 0, 0);
      chosenHour = sorted[0];
    }

    const diffSec = Math.max(0, Math.floor((target.getTime() - mskNow.getTime()) / 1000));
    const hh = String(Math.floor(diffSec / 3600)).padStart(2, '0');
    const mm = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
    const ss = String(diffSec % 60).padStart(2, '0');

    return {
      countdown: `${hh}:${mm}:${ss}`,
      nextRestartLabel: `${String(chosenHour).padStart(2, '0')}:00 МСК`,
    };
  };

  const [value, setValue] = useState(compute);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(compute());
    }, 1000);
    return () => clearInterval(timer);
  }, [restartHoursMSK]);

  return value;
}
