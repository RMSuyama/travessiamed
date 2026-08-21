import Hero from './Hero';
import Universities from './Universities';
import Comparison from './Comparison';
import ProcessSteps from './ProcessSteps';
import Testimonials from './Testimonials';
import LeadForm from './LeadForm';
import ExplorePages from './ExplorePages';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Universities />
      <Comparison />
      <LeadForm />
      <ProcessSteps />
      <Testimonials />
      <ExplorePages />
    </>
  );
}
