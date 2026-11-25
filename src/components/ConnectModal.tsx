import { useState } from 'react';
import { X, Copy, Check, ExternalLink, Gamepad2, AlertTriangle } from 'lucide-react';
import { SERVER_CONFIG } from '../config/server';

interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConnectModal({ open, onClose }: ConnectModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const fullAddress = `${SERVER_CONFIG.connection.ip}:${SERVER_CONFIG.connection.port}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="dossier-card w-full max-w-lg rounded-md p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="font-mono-tech text-[11px] tracking-[0.2em] text-[#ef233c] uppercase">
              ПРОТОКОЛ ПОДКЛЮЧЕНИЯ // ОЛЕНИЙ ОСТРОВ
            </div>
            <h3 className="font-display mt-1 text-2xl font-bold tracking-wide text-white uppercase">
              Вход в сектор {SERVER_CONFIG.brand.shortName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer rounded border border-white/10 p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5">
          <label className="font-mono-tech mb-2 block text-xs text-zinc-400 uppercase">
            Прямой адрес сервера (IP : Port)
          </label>
          <div className="flex items-center justify-between gap-3 rounded border border-white/15 bg-black/60 px-4 py-3">
            <code className="font-mono-tech text-base font-semibold tracking-wide text-white">
              {fullAddress}
            </code>
            <button
              onClick={handleCopy}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#c81e2b]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Копировать</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <a
            href={SERVER_CONFIG.connection.steamConnectUrl}
            className="flex items-center justify-center gap-2 rounded bg-[#c81e2b] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#dc2626]"
          >
            <Gamepad2 className="h-4 w-4" />
            <span>Через Steam</span>
          </a>
          <a
            href={SERVER_CONFIG.connection.dzsaLaunchUrl}
            className="flex items-center justify-center gap-2 rounded border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <ExternalLink className="h-4 w-4" />
            <span>DZSA Launcher</span>
          </a>
        </div>

        <div className="flex items-start gap-3 rounded border border-amber-500/25 bg-amber-500/5 p-3.5 text-xs leading-relaxed text-zinc-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          <div>
            <span className="font-semibold text-white">Правило §1.1 перед входом:</span> игровой
            никнейм в лаунчере обязан совпадать с вашим ником в Discord (например: Discord —{' '}
            <span className="text-white">Велес</span>, Игра —{' '}
            <span className="text-white">Veles</span>), а возраст игрока должен быть 16+.
          </div>
        </div>
      </div>
    </div>
  );
}
