import React from 'react';
import Hero from '../components/Hero';
import MythsAndFacts from '../components/MythsAndFacts';
import Universities from '../components/Universities';
import Comparison from '../components/Comparison';
import CostOfLiving from '../components/CostOfLiving';
import SavingsCalculator from '../components/SavingsCalculator';
import ProcessSteps from '../components/ProcessSteps';
import ParentsSupport from '../components/ParentsSupport';
import Testimonials from '../components/Testimonials';
import LeadForm from '../components/LeadForm';
import Faq from '../components/Faq';
import ViewToc from '../components/ViewToc';

export default function HomePage() {
  return (
    <>
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
    </>
  );
}
