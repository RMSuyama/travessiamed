import React, { useEffect } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import MythsAndFacts from './components/MythsAndFacts';
import Universities from './components/Universities';
import Comparison from './components/Comparison';
import CostOfLiving from './components/CostOfLiving';
import SavingsCalculator from './components/SavingsCalculator';
import ProcessSteps from './components/ProcessSteps';
import ParentsSupport from './components/ParentsSupport';
import Testimonials from './components/Testimonials';
import LeadForm from './components/LeadForm';
import Faq from './components/Faq';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import ViewToc from './components/ViewToc';
import { initAntigravity } from './motion/initAntigravity';

export default function App() {
  useEffect(() => {
    const teardown = initAntigravity(document);
    return teardown;
  }, []);

  return (
    <div className="app-root">
      <TopBar />
      <Header />
      <ViewToc />

      <Hero />
      <MythsAndFacts />
      <Universities />
      <Comparison />
      <CostOfLiving />
      <SavingsCalculator />
      <ProcessSteps />
      <ParentsSupport />
      <Testimonials />
      <LeadForm />
      <Faq />
      <Footer />

      <WhatsAppFloating />
    </div>
  );
}
