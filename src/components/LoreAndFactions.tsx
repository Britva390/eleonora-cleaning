import { useState } from 'react';
import { Shield, Flame, Compass, FlaskConical, Skull } from 'lucide-react';
import { FACTIONS, FactionItem, LORE_TIMELINE } from '../config/server';

const FACTION_TYPE_META: Record<
  FactionItem['type'],
  { label: string; badgeClass: string; icon: typeof Shield }
> = {
  order: {
    label: 'Порядок и наука',
    badgeClass: 'border-sky-500/35 bg-sky-500/10 text-sky-300',
    icon: FlaskConical,
  },
  neutral: {
    label: 'Нейтральные ГП',
    badgeClass: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300',
    icon: Compass,
  },
  criminal: {
    label: 'Криминал',
    badgeClass: 'border-amber-500/35 bg-amber-500/10 text-amber-300',
    icon: Skull,
  },
  fanatic: {
    label: 'Фанатики / Мета-набор',
    badgeClass: 'border-[#ef233c]/40 bg-[#c81e2b]/15 text-[#ff6b78]',
    icon: Flame,
  },
};

export function LoreAndFactions() {
  const [filter, setFilter] = useState<'all' | FactionItem['type']>('all');

  const visibleFactions =
    filter === 'all' ? FACTIONS : FACTIONS.filter((f) => f.type === filter);

  return (
    <section id="lore" className="relative border-t border-white/10 bg-[#0b0d12] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Lore Header + Atmospheric Banner */}
        <div className="mb-10 grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="font-mono-tech text-xs tracking-[0.22em] text-[#ef233c] uppercase">
              ХРОНИКА МИРА // ОЛЕНИЙ ОСТРОВ
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
              Как мир рухнул и родился периметр надежды
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
              От первых залпов войны 2023 года и запрещённого химического удара в апреле 2025-го —
              к затерянному на Дальнем Востоке <span className="font-semibold text-white">Оленьему острову</span>,
              где лагерь беженцев, военная часть РФ и учёные НИИ имени Гагарина борются за выживание
              под странными потусторонними огнями.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="dossier-card relative overflow-hidden rounded-md">
              <div className="relative h-64 w-full sm:h-72">
                <img
                  src="/images/deer-isle-camp.jpg"
                  alt="Лагерь беженцев на Оленьем острове под потусторонними огнями"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-black/30" />
                <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <div className="font-mono-tech text-[11px] tracking-[0.18em] text-[#ef233c] uppercase">
                      ДАЛЬНИЙ ВОСТОК // DEER ISLE
                    </div>
                    <div className="font-display text-xl font-bold text-white uppercase">
                      Олений остров — маяк для отчаявшихся
                    </div>
                  </div>
                  <span className="font-mono-tech rounded border border-white/15 bg-black/70 px-2.5 py-1 text-[11px] text-zinc-200">
                    1 вертолёт · Суда снабжения
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Chronology Timeline */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {LORE_TIMELINE.map((stage) => (
            <article
              key={stage.era}
              className="dossier-card flex flex-col justify-between rounded-md p-6 transition-colors hover:border-[#c81e2b]/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-[#c81e2b]/15 px-2.5 py-1 font-mono-tech text-xs font-bold text-[#ef233c]">
                    {stage.era}
                  </span>
                  <span className="font-mono-tech text-[10px] tracking-wider text-zinc-500 uppercase">
                    {stage.tag}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl font-bold tracking-wide text-white uppercase">
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{stage.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Factions Roster */}
        <div id="factions" className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="font-mono-tech text-xs tracking-[0.22em] text-[#ef233c] uppercase">
                СИЛЫ ОСТРОВА // ОФИЦИАЛЬНЫЕ ГРУППИРОВКИ
              </div>
              <h3 className="font-display mt-2 text-2xl font-bold tracking-wide text-white uppercase sm:text-3xl">
                Группировки Оленьего острова
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                Каждая группировка имеет свою базу с Зелёной Зоной (ЗЗ 300 м), обязательный шеврон,
                тег в никнейме и правила дипломатии.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`cursor-pointer rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-[#c81e2b] text-white'
                    : 'border border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/10'
                }`}
              >
                Все ({FACTIONS.length})
              </button>
              {(['order', 'neutral', 'criminal', 'fanatic'] as const).map((typeKey) => (
                <button
                  key={typeKey}
                  onClick={() => setFilter(typeKey)}
                  className={`cursor-pointer rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                    filter === typeKey
                      ? 'bg-[#c81e2b] text-white'
                      : 'border border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {FACTION_TYPE_META[typeKey].label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleFactions.map((faction) => {
              const meta = FACTION_TYPE_META[faction.type];
              const Icon = meta.icon;
              return (
                <div
                  key={faction.tag}
                  className="flex flex-col justify-between rounded-md border border-white/10 bg-[#11141c] p-5 transition-all hover:-translate-y-0.5 hover:border-[#c81e2b]/50"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-tech rounded bg-white/5 px-2 py-0.5 text-xs font-bold text-white">
                        {faction.tag}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono-tech text-[10px] uppercase ${meta.badgeClass}`}
                      >
                        <Icon className="h-3 w-3" />
                        <span>{meta.label}</span>
                      </span>
                    </div>

                    <h4 className="font-display mt-3 text-xl font-bold tracking-wide text-white uppercase">
                      {faction.name}
                    </h4>
                    <div className="mt-1 font-mono-tech text-[11px] text-zinc-400">
                      База: <span className="text-zinc-200">{faction.base}</span>
                    </div>
                    <div className="mt-0.5 font-mono-tech text-[11px] text-[#ef233c]">
                      Набор: {faction.recruitment}
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-zinc-300">
                      {faction.description}
                    </p>

                    <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
                      {faction.features.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ef233c]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 border-t border-white/5 pt-3 font-mono-tech text-[10px] leading-relaxed text-zinc-500">
                    {faction.forbiddenAllies}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
