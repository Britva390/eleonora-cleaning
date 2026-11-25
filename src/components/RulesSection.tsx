import { useMemo, useState } from 'react';
import { ShieldAlert, Search, ChevronDown, ExternalLink, ChevronsUpDown } from 'lucide-react';
import { OFFICIAL_RULES, RULE_CATEGORY_TABS } from '../data/rulesData';
import { SERVER_CONFIG } from '../config/server';

type TabId = (typeof RULE_CATEGORY_TABS)[number]['id'];

export function RulesSection() {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    preamble: true,
    'sec-1': true,
    'sec-2': true,
    'sec-3': true,
  });

  const toggleSection = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return OFFICIAL_RULES.filter((sec) => {
      const matchesTab = activeTab === 'all' || sec.category === activeTab;
      if (!q) return matchesTab;

      const textHit =
        sec.number.toLowerCase().includes(q) ||
        sec.title.toLowerCase().includes(q) ||
        sec.summary.toLowerCase().includes(q) ||
        sec.blocks.some(
          (b) =>
            (b.heading && b.heading.toLowerCase().includes(q)) ||
            b.items.some((item) => item.toLowerCase().includes(q))
        );
      return textHit;
    });
  }, [activeTab, searchQuery]);

  const allExpanded =
    filteredSections.length > 0 && filteredSections.every((sec) => openIds[sec.id]);

  const toggleAllVisible = () => {
    const nextState = !allExpanded;
    const updated: Record<string, boolean> = { ...openIds };
    for (const sec of filteredSections) {
      updated[sec.id] = nextState;
    }
    setOpenIds(updated);
  };

  return (
    <section id="rules" className="relative border-t border-white/10 bg-[#0b0d12] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.22em] text-[#ef233c] uppercase">
              ОФИЦИАЛЬНЫЙ УСТАВ // 20 РАЗДЕЛОВ
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
              Полные правила MezhMir | Virus RP
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Олений остров. Постапокалипсис. Выживай. Играй. Оставайся человеком. Все разделы
              синхронизированы с официальным документом проекта.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SERVER_CONFIG.connection.rulesDocUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold tracking-wider text-zinc-200 uppercase transition-colors hover:border-[#c81e2b] hover:text-white"
            >
              <span>Оригинал (Google Docs)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={toggleAllVisible}
              className="inline-flex cursor-pointer items-center gap-2 rounded border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold tracking-wider text-zinc-200 uppercase transition-colors hover:bg-white/10"
            >
              <ChevronsUpDown className="h-3.5 w-3.5" />
              <span>{allExpanded ? 'Свернуть всё' : 'Развернуть всё'}</span>
            </button>
          </div>
        </div>

        {/* Category Tabs + Search */}
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-md border border-white/10 bg-[#10131b] p-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2">
            {RULE_CATEGORY_TABS.map((tab) => {
              const active = tab.id === activeTab && !searchQuery.trim();
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                  }}
                  className={`cursor-pointer rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? 'bg-[#c81e2b] text-white'
                      : 'bg-white/[0.04] text-zinc-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по правилам (ЗЗ, КЗ, плен, рейд...)"
              className="w-full rounded border border-white/15 bg-black/50 py-2 pr-3 pl-9 text-xs text-white placeholder:text-zinc-500 focus:border-[#c81e2b] focus:outline-none"
            />
          </div>
        </div>

        {searchQuery.trim() && (
          <div className="mb-5 flex items-center gap-2 rounded border border-[#c81e2b]/30 bg-[#c81e2b]/10 px-4 py-2.5 text-xs text-zinc-200">
            <ShieldAlert className="h-4 w-4 shrink-0 text-[#ef233c]" />
            <span>
              Поиск по всему своду правил «{searchQuery}»: найдено разделов — {filteredSections.length}
            </span>
          </div>
        )}

        {/* Accordion Sections */}
        {filteredSections.length === 0 ? (
          <div className="rounded-md border border-white/10 bg-[#10131b] p-10 text-center text-sm text-zinc-400">
            По вашему запросу ничего не найдено. Попробуйте другой термин (например: «шеврон», «выкуп», «рейд», «50 метров»).
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSections.map((sec) => {
              const isOpen = Boolean(openIds[sec.id]) || Boolean(searchQuery.trim());
              return (
                <div
                  key={sec.id}
                  className="overflow-hidden rounded-md border border-white/10 bg-[#10131b] transition-colors hover:border-white/20"
                >
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                      <span className="font-mono-tech inline-flex w-fit shrink-0 items-center rounded bg-[#c81e2b]/15 px-2.5 py-1 text-xs font-bold text-[#ef233c]">
                        {sec.number}
                      </span>
                      <div>
                        <div className="font-display text-lg font-bold tracking-wide text-white uppercase">
                          {sec.title}
                        </div>
                        <div className="text-xs text-zinc-400">{sec.summary}</div>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="space-y-5 border-t border-white/10 bg-black/35 px-5 py-5">
                      {sec.blocks.map((block, bIdx) => (
                        <div key={bIdx} className="space-y-2.5">
                          {block.heading && (
                            <h4 className="font-mono-tech text-xs font-semibold tracking-wider text-[#ef233c] uppercase">
                              {block.heading}
                            </h4>
                          )}
                          <ul className="space-y-2">
                            {block.items.map((item, iIdx) => (
                              <li
                                key={iIdx}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c81e2b]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
