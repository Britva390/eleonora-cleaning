import { useMemo, useState } from 'react';
import { Package, Search, ExternalLink, CheckCircle2 } from 'lucide-react';
import { MOD_CATEGORIES, SERVER_CONFIG, SERVER_MODS } from '../config/server';

type CategoryFilter = (typeof MOD_CATEGORIES)[number]['id'];

export function ModsSection() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');

  const filteredMods = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVER_MODS.filter((mod) => {
      const matchesCat = category === 'all' || mod.category === category;
      const matchesQuery =
        !q ||
        mod.name.toLowerCase().includes(q) ||
        mod.description.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [category, query]);

  return (
    <section id="mods" className="relative border-t border-white/10 bg-[#08090c] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.22em] text-[#ef233c] uppercase">
              STEAM WORKSHOP // СБОРКА СЕРВЕРА
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
              Модификации и пакеты данных
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Сборка оптимизирована под высокий FPS и стабильность. Все моды загружаются
              автоматически через официальный лаунчер DayZ или DZSA при первом входе.
            </p>
          </div>

          <a
            href={SERVER_CONFIG.connection.workshopCollectionUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded bg-[#c81e2b] px-5 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#dc2626]"
          >
            <Package className="h-4 w-4" />
            <span>Коллекция Steam Workshop</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-md border border-white/10 bg-[#0f1218] p-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {MOD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`cursor-pointer rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                  category === cat.id
                    ? 'bg-[#c81e2b] text-white'
                    : 'bg-white/[0.04] text-zinc-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск мода..."
              className="w-full rounded border border-white/10 bg-black/50 py-2 pr-3 pl-9 text-xs text-white placeholder:text-zinc-500 focus:border-[#c81e2b] focus:outline-none"
            />
          </div>
        </div>

        {/* Mods Grid */}
        {filteredMods.length === 0 ? (
          <div className="rounded-md border border-white/10 bg-[#0f1218] p-10 text-center text-sm text-zinc-400">
            По вашему запросу моды не найдены.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMods.map((mod) => (
              <div
                key={mod.id}
                className="flex flex-col justify-between rounded-md border border-white/10 bg-[#10131b] p-5 transition-colors hover:border-white/25"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-white">{mod.name}</h3>
                    <span className="font-mono-tech shrink-0 rounded bg-white/5 px-2 py-0.5 text-[11px] text-zinc-300">
                      {mod.size}
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">{mod.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="flex items-center gap-1.5 font-mono-tech text-[11px] text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {mod.required ? 'Обязательный' : 'Опционально'}
                  </span>
                  <span className="font-mono-tech text-[10px] tracking-wider text-zinc-500 uppercase">
                    {MOD_CATEGORIES.find((c) => c.id === mod.category)?.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
