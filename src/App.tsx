import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MonitoringSection } from './components/MonitoringSection';
import { LoreAndFactions } from './components/LoreAndFactions';
import { ModsSection } from './components/ModsSection';
import { RulesSection } from './components/RulesSection';
import { OnboardingAndFaq } from './components/OnboardingAndFaq';
import { Footer } from './components/Footer';
import { ConnectModal } from './components/ConnectModal';
import { useServerStatus } from './hooks/useServerStatus';

export function App() {
  const server = useServerStatus();
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08090c] text-[#eceef2]">
      <Navbar server={server} onOpenConnect={() => setConnectOpen(true)} />
      <main>
        <Hero server={server} onOpenConnect={() => setConnectOpen(true)} />
        <MonitoringSection server={server} />
        <LoreAndFactions />
        <ModsSection />
        <RulesSection />
        <OnboardingAndFaq onOpenConnect={() => setConnectOpen(true)} />
      </main>
      <Footer />
      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </div>
  );
}

export default App;
