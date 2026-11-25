import { SERVER_CONFIG } from '../config/server';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06070a] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}images/emblem.png`}
            alt="MezhMir Emblem"
            className="h-9 w-9 rounded border border-white/10 object-cover"
          />
          <div>
            <div className="font-display text-base font-bold tracking-wider text-white uppercase">
              {SERVER_CONFIG.brand.fullName}
            </div>
            <div className="text-xs text-zinc-500">
              Неофициальный игровой проект на базе DayZ Standalone. Не связан с Bohemia Interactive.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
          <a href="#monitoring" className="transition-colors hover:text-white">
            Мониторинг
          </a>
          <a href="#lore" className="transition-colors hover:text-white">
            О сервере
          </a>
          <a href="#mods" className="transition-colors hover:text-white">
            Моды
          </a>
          <a href="#rules" className="transition-colors hover:text-white">
            Правила
          </a>
          <a href="#start" className="transition-colors hover:text-white">
            Как начать
          </a>
        </div>
      </div>
    </footer>
  );
}
