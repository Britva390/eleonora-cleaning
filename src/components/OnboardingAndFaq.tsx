import { useState } from 'react';
import { ChevronDown, MessageSquare, Send, ArrowUpRight } from 'lucide-react';
import { FAQ_ITEMS, ONBOARDING_STEPS, SERVER_CONFIG } from '../config/server';

interface OnboardingAndFaqProps {
  onOpenConnect: () => void;
}

export function OnboardingAndFaq({ onOpenConnect }: OnboardingAndFaqProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="start" className="relative border-t border-white/10 bg-[#08090c] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* How to start */}
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.22em] text-[#ef233c] uppercase">
              ИНСТРУКТАЖ НОВОБРАНЦА // 4 ШАГА
            </div>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
              Как начать играть на MezhMir
            </h2>
          </div>
          <button
            onClick={onOpenConnect}
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded bg-[#c81e2b] px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#dc2626]"
          >
            <span>Быстрое подключение</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ONBOARDING_STEPS.map((item) => (
            <div
              key={item.step}
              className="dossier-card flex flex-col justify-between rounded-md p-6"
            >
              <div>
                <div className="font-mono-tech text-3xl font-bold text-[#c81e2b]/80">
                  {item.step}
                </div>
                <h3 className="font-display mt-3 text-xl font-bold tracking-wide text-white uppercase">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ + Discord Banner */}
        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          {/* FAQ */}
          <div className="lg:col-span-7">
            <div className="font-mono-tech text-xs tracking-[0.22em] text-[#ef233c] uppercase">
              СПРАВОЧНИК ВЫЖИВШЕГО
            </div>
            <h3 className="font-display mt-2 text-2xl font-bold tracking-wide text-white uppercase sm:text-3xl">
              Частые вопросы
            </h3>

            <div className="mt-6 space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-md border border-white/10 bg-[#10131b]"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-white sm:text-base">{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-zinc-300">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Community & Discord CTA */}
          <div id="community" className="lg:col-span-5">
            <div className="dossier-card flex h-full flex-col justify-between rounded-md p-6 sm:p-8">
              <div>
                <div className="font-mono-tech text-xs tracking-[0.22em] text-[#ef233c] uppercase">
                  РАДИОЧАСТОТА СООБЩЕСТВА
                </div>
                <h3 className="font-display mt-2 text-2xl font-bold tracking-wide text-white uppercase sm:text-3xl">
                  Штаб проекта в Discord
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  В Discord выходят все патчи, расписание сюжетных ивентов, тикет-поддержка
                  администрации, приём квент во фракции и новости карантина.
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={SERVER_CONFIG.socials.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded bg-[#5865F2] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#4752C4]"
                  >
                    <span className="flex items-center gap-2.5">
                      <MessageSquare className="h-4 w-4" />
                      <span>Перейти в Discord сервер</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={SERVER_CONFIG.socials.vk}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded border border-white/15 bg-white/[0.04] px-4 py-3 text-xs font-semibold tracking-wider text-zinc-200 uppercase transition-colors hover:border-white/30 hover:bg-white/10"
                    >
                      <span>Группа VK</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={SERVER_CONFIG.socials.telegram}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded border border-white/15 bg-white/[0.04] px-4 py-3 text-xs font-semibold tracking-wider text-zinc-200 uppercase transition-colors hover:border-white/30 hover:bg-white/10"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Telegram</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-4 font-mono-tech text-xs text-zinc-400">
                Администрация и кураторы RP на связи ежедневно с 10:00 до 00:00 МСК.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
