import { useState } from 'react';
import {
  Copy,
  Check,
  ExternalLink,
  Gamepad2,
  Server,
  Clock,
  Eye,
  CloudRain,
  RefreshCw,
  Wifi,
} from 'lucide-react';
import { SERVER_CONFIG } from '../config/server';
import { LiveServerState, useRestartCountdown } from '../hooks/useServerStatus';

interface MonitoringSectionProps {
  server: LiveServerState;
}

export function MonitoringSection({ server }: MonitoringSectionProps) {
  const [copied, setCopied] = useState(false);
  const { countdown, nextRestartLabel } = useRestartCountdown(SERVER_CONFIG.restartHoursMSK);
  const address = `${SERVER_CONFIG.connection.ip}:${SERVER_CONFIG.connection.port}`;
  const fillPercent = Math.min(100, Math.round((server.players / server.maxPlayers) * 100));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const specs = [
    { icon: Eye, label: 'Камера и режим', value: server.perspective },
    { icon: Clock, label: 'Течение времени', value: server.timeScale },
    { icon: CloudRain, label: 'Текущая погода', value: `${server.weather} (${server.inGameTime})` },
    { icon: Wifi, label: 'Регион хостинга', value: server.pingRegion },
    { icon: RefreshCw, label: 'Последний вайп', value: server.lastWipe },
    { icon: Server, label: 'Слоты / Очередь', value: `${server.players}/${server.maxPlayers} (Очередь: ${server.queue})` },
  ];

  return (
    <section id="monitoring" className="relative border-t border-white/10 bg-[#08090c] py-20 sm:py-24">
      <div className="bg-tactical-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.22em] text-[#ef233c] uppercase">
              СЕКТОР МОНИТОРИНГА // ТЕЛЕМЕТРИЯ
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
              Состояние сервера и быстрый коннект
            </h2>
          </div>
          <div className="font-mono-tech flex items-center gap-2 rounded border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400">
            <span
              className={`h-2 w-2 rounded-full ${
                server.online ? 'status-dot-live bg-[#ef233c]' : 'bg-zinc-500'
              }`}
            />
            <span>
              {server.isLiveApi ? 'BattleMetrics Live Sync' : 'Статус узла: Активен'}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Server Card */}
          <div className="dossier-card rounded-md p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="rounded bg-[#c81e2b]/20 px-2 py-0.5 font-mono-tech text-[11px] font-semibold text-[#ef233c] uppercase">
                    MAIN NODE
                  </span>
                  <span className="font-mono-tech text-xs text-zinc-400">
                    DAYZ v1.26+
                  </span>
                </div>
                <h3 className="font-display mt-2 text-2xl font-bold tracking-wide text-white uppercase sm:text-3xl">
                  {SERVER_CONFIG.brand.fullName}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Карта: <span className="text-zinc-200">{server.map}</span>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="font-mono-tech text-xs text-zinc-400 uppercase">Онлайн</div>
                <div className="font-mono-tech mt-0.5 text-3xl font-bold text-white">
                  {server.players}
                  <span className="text-lg font-normal text-zinc-500">/{server.maxPlayers}</span>
                </div>
              </div>
            </div>

            {/* Capacity bar */}
            <div className="mt-5">
              <div className="mb-1.5 flex justify-between font-mono-tech text-xs text-zinc-400">
                <span>Загруженность сектора</span>
                <span className="text-zinc-200">{fillPercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#88131d] via-[#c81e2b] to-[#ef4444]"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
            </div>

            {/* IP & Connect Buttons */}
            <div className="mt-6 rounded border border-white/10 bg-black/50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-mono-tech text-[11px] tracking-wider text-zinc-400 uppercase">
                    Прямой IP-адрес подключения
                  </div>
                  <div className="font-mono-tech mt-1 text-lg font-semibold text-white">
                    {address}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[#c81e2b] hover:bg-[#c81e2b]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Копировать IP</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
                <a
                  href={SERVER_CONFIG.connection.steamConnectUrl}
                  className="flex items-center justify-center gap-2 rounded bg-[#c81e2b] px-4 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#dc2626]"
                >
                  <Gamepad2 className="h-4 w-4" />
                  <span>Запустить через Steam</span>
                </a>
                <a
                  href={SERVER_CONFIG.connection.dzsaLaunchUrl}
                  className="flex items-center justify-center gap-2 rounded border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold tracking-wider text-zinc-200 uppercase transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Открыть в DZSA</span>
                </a>
              </div>
            </div>

            {/* Technical Specs Grid */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {specs.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded border border-white/5 bg-white/[0.02] p-3"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#ef233c]" />
                    <div className="min-w-0">
                      <div className="font-mono-tech text-[11px] text-zinc-400 uppercase">
                        {item.label}
                      </div>
                      <div className="truncate text-sm font-medium text-zinc-100">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Quarantine Sector Visual + Restart Schedule */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Bunker Visual Card */}
            <div className="dossier-card relative overflow-hidden rounded-md">
              <div className="relative h-56 w-full">
                <img
                  src={`${import.meta.env.BASE_URL}images/biohazard-zone.jpg`}
                  alt="Карантинный бункер MezhMir"
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/40 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="font-mono-tech text-[11px] tracking-[0.2em] text-[#ef233c] uppercase">
                    УРОВЕНЬ УГРОЗЫ: БИО-4
                  </div>
                  <div className="font-display mt-1 text-xl font-bold tracking-wide text-white uppercase">
                    Закрытые лаборатории и бункеры
                  </div>
                </div>
              </div>
              <div className="p-5 text-sm leading-relaxed text-zinc-300">
                Каждые 4 часа сервер выполняет плановую очистку мусора, обновление динамических
                очагов заражения и синхронизацию состояния баз.
              </div>
            </div>

            {/* Restart Schedule Card */}
            <div className="dossier-card flex-1 rounded-md p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="font-mono-tech text-[11px] tracking-[0.18em] text-[#ef233c] uppercase">
                    РАСПИСАНИЕ РЕСТАРТОВ
                  </div>
                  <h3 className="font-display mt-1 text-xl font-bold text-white uppercase">
                    Цикл стабилизации (МСК)
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-mono-tech text-[11px] text-zinc-400">ДО СЛЕДУЮЩЕГО</div>
                  <div className="font-mono-tech text-lg font-bold text-[#ef233c]">{countdown}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {SERVER_CONFIG.restartHoursMSK.map((hour) => {
                  const label = `${String(hour).padStart(2, '0')}:00 МСК`;
                  const isNext = label === nextRestartLabel;
                  return (
                    <div
                      key={hour}
                      className={`rounded border px-3 py-2.5 text-center font-mono-tech text-xs transition-colors ${
                        isNext
                          ? 'border-[#c81e2b] bg-[#c81e2b]/15 font-semibold text-white'
                          : 'border-white/10 bg-white/[0.02] text-zinc-400'
                      }`}
                    >
                      <div>{String(hour).padStart(2, '0')}:00</div>
                      {isNext && (
                        <div className="mt-0.5 text-[10px] tracking-wider text-[#ef233c] uppercase">
                          СЛЕДУЮЩИЙ
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                Предупреждение о перезапуске появляется в чате за 15, 5 и 1 минуту. За 60 секунд до
                рестарта рекомендуем выйти из транспорта и закрыть двери убежища.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
