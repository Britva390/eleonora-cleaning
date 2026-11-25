import { Biohazard, ChevronRight, Copy, Check, Users, MapPin, Clock, Activity } from 'lucide-react';
import { useState } from 'react';
import { SERVER_CONFIG } from '../config/server';
import { LiveServerState, useRestartCountdown } from '../hooks/useServerStatus';

interface HeroProps {
  server: LiveServerState;
  onOpenConnect: () => void;
}

export function Hero({ server, onOpenConnect }: HeroProps) {
  const [copiedIp, setCopiedIp] = useState(false);
  const { countdown, nextRestartLabel } = useRestartCountdown(SERVER_CONFIG.restartHoursMSK);

  const ipPort = `${SERVER_CONFIG.connection.ip}:${SERVER_CONFIG.connection.port}`;
  const fillPercent = Math.min(100, Math.round((server.players / server.maxPlayers) * 100));

  const copyQuickIp = async () => {
    try {
      await navigator.clipboard.writeText(ipPort);
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden pt-16">
      {/* Background Art + Layered Dark Crimson Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-virus.jpg`}
          alt="Карантинный КПП MezhMir Virus RP"
          className="h-full w-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090c] via-[#08090c]/82 to-[#08090c]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-[#08090c]/75" />
        <div className="bg-scanlines absolute inset-0 opacity-60" />
        <div className="absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-[#c81e2b]/15 blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow Tag */}
          <div className="mb-5 inline-flex items-center gap-2.5 rounded border border-[#c81e2b]/40 bg-[#c81e2b]/10 px-3.5 py-1.5 backdrop-blur-sm">
            <Biohazard className="h-4 w-4 text-[#ef233c]" />
            <span className="font-mono-tech text-xs font-medium tracking-[0.18em] text-zinc-200 uppercase">
              {SERVER_CONFIG.brand.season}
            </span>
          </div>

          {/* Display Title */}
          <h1 className="font-display text-5xl leading-[0.95] font-bold tracking-tight text-white uppercase sm:text-7xl lg:text-[5.25rem]">
            MEZHMIR
            <span className="block text-[#e12535]">VIRUS RP</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
            <span className="font-semibold text-white">{SERVER_CONFIG.brand.tagline}</span>{' '}
            После катастрофы апреля 2025 года остатки человечества укрылись на Оленьем острове
            Дальнего Востока — среди лагеря беженцев, военных кордонов и закрытых исследований НИИ
            имени Гагарина.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenConnect}
              className="inline-flex cursor-pointer items-center gap-2.5 rounded bg-[#c81e2b] px-6 py-3.5 text-sm font-semibold tracking-wider text-white uppercase shadow-[0_0_30px_rgba(200,30,43,0.45)] transition-all hover:bg-[#dc2626] active:scale-[0.98]"
            >
              <span>Подключиться к серверу</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <a
              href="#lore"
              className="inline-flex items-center gap-2 rounded border border-white/20 bg-black/50 px-6 py-3.5 text-sm font-semibold tracking-wider text-zinc-100 uppercase backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <span>Лор и фракции</span>
            </a>

            <a
              href="#rules"
              className="inline-flex items-center gap-2 rounded border border-white/15 bg-black/40 px-5 py-3.5 text-sm font-semibold tracking-wider text-zinc-300 uppercase backdrop-blur-sm transition-colors hover:border-[#c81e2b]/60 hover:text-white"
            >
              <span>Полные правила</span>
            </a>

            <button
              onClick={copyQuickIp}
              className="font-mono-tech inline-flex cursor-pointer items-center gap-2 rounded border border-white/10 bg-[#10131a]/80 px-4 py-3.5 text-xs text-zinc-300 transition-colors hover:border-[#c81e2b]/50 hover:text-white"
              title="Скопировать IP адрес"
            >
              {copiedIp ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-300">IP скопирован!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{ipPort}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Live Telemetry Strip */}
      <div className="relative z-10 border-t border-white/10 bg-[#0b0d12]/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <div className="px-4 py-4 sm:px-6">
            <div className="font-mono-tech flex items-center gap-2 text-[11px] tracking-wider text-zinc-400 uppercase">
              <Activity className="h-3.5 w-3.5 text-[#ef233c]" />
              <span>Статус острова</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  server.online ? 'status-dot-live bg-[#ef233c]' : 'bg-zinc-500'
                }`}
              />
              <span className="font-display text-lg font-semibold tracking-wide text-white uppercase">
                {server.online ? 'Сервер активен' : 'Тех. работы'}
              </span>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6">
            <div className="font-mono-tech flex items-center gap-2 text-[11px] tracking-wider text-zinc-400 uppercase">
              <Users className="h-3.5 w-3.5 text-[#ef233c]" />
              <span>Выживших онлайн</span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between gap-2">
              <span className="font-mono-tech text-lg font-bold text-white">
                {server.players} <span className="text-sm font-normal text-zinc-400">/ {server.maxPlayers}</span>
              </span>
              {server.queue > 0 && (
                <span className="font-mono-tech text-[11px] text-amber-400">
                  Очередь: {server.queue}
                </span>
              )}
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#991b1b] to-[#ef233c] transition-all duration-500"
                style={{ width: `${fillPercent}%` }}
              />
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6">
            <div className="font-mono-tech flex items-center gap-2 text-[11px] tracking-wider text-zinc-400 uppercase">
              <MapPin className="h-3.5 w-3.5 text-[#ef233c]" />
              <span>Карта / Режим</span>
            </div>
            <div className="font-display mt-1.5 truncate text-lg font-semibold tracking-wide text-white uppercase">
              {server.map}
            </div>
            <div className="font-mono-tech text-[11px] text-zinc-400">{server.perspective}</div>
          </div>

          <div className="px-4 py-4 sm:px-6">
            <div className="font-mono-tech flex items-center gap-2 text-[11px] tracking-wider text-zinc-400 uppercase">
              <Clock className="h-3.5 w-3.5 text-[#ef233c]" />
              <span>До рестарта</span>
            </div>
            <div className="font-mono-tech mt-1.5 text-lg font-bold tracking-wider text-white">
              {countdown}
            </div>
            <div className="font-mono-tech text-[11px] text-zinc-400">
              Следующий в {nextRestartLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
