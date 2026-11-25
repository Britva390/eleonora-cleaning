import { useState } from 'react';
import { Menu, X, Terminal, ShieldAlert } from 'lucide-react';
import { SERVER_CONFIG } from '../config/server';
import { LiveServerState } from '../hooks/useServerStatus';

interface NavbarProps {
  server: LiveServerState;
  onOpenConnect: () => void;
}

const NAV_LINKS = [
  { href: '#monitoring', label: 'Мониторинг' },
  { href: '#lore', label: 'Лор' },
  { href: '#factions', label: 'Фракции' },
  { href: '#mods', label: 'Моды' },
  { href: '#rules', label: 'Правила' },
  { href: '#start', label: 'Как начать' },
];

export function Navbar({ server, onOpenConnect }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08090c]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="group flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded border border-white/15 bg-black">
            <img
              src="/images/emblem.png"
              alt="MezhMir Virus RP Emblem"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="leading-none">
            <div className="font-display text-lg font-bold tracking-wider text-white">
              {SERVER_CONFIG.brand.shortName}{' '}
              <span className="text-[#e12535]">| {SERVER_CONFIG.brand.subtitle}</span>
            </div>
            <div className="font-mono-tech mt-0.5 text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
              ОЛЕНИЙ ОСТРОВ · DAYZ RP
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#monitoring"
            className="hidden items-center gap-2 rounded border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs transition-colors hover:border-[#c81e2b]/50 sm:flex"
            title="Статус сервера"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                server.online ? 'status-dot-live bg-[#ef233c]' : 'bg-zinc-500'
              }`}
            />
            <span className="font-mono-tech font-medium text-zinc-200">
              {server.online ? 'ONLINE' : 'OFFLINE'}
            </span>
            <span className="text-zinc-500">|</span>
            <span className="font-mono-tech text-zinc-300">
              {server.players}/{server.maxPlayers}
            </span>
          </a>

          <button
            onClick={onOpenConnect}
            className="inline-flex cursor-pointer items-center gap-2 rounded bg-[#c81e2b] px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase shadow-[0_0_20px_rgba(200,30,43,0.35)] transition-all hover:bg-[#dc2626] active:scale-[0.98]"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Играть</span>
          </button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded border border-white/10 p-2 text-zinc-300 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Открыть меню"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0b0d12] px-4 py-4 lg:hidden">
          <div className="mb-3 flex items-center justify-between rounded border border-white/10 bg-white/[0.03] px-3 py-2 text-xs">
            <span className="flex items-center gap-2 text-zinc-300">
              <ShieldAlert className="h-4 w-4 text-[#ef233c]" />
              Статус: {server.online ? 'Сервер работает' : 'Оффлайн'}
            </span>
            <span className="font-mono-tech font-semibold text-white">
              {server.players} / {server.maxPlayers}
            </span>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
