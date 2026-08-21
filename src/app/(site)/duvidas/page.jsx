import MythsAndFacts from '../../../components/MythsAndFacts';
import Faq from '../../../components/Faq';

export const metadata = {
  title: 'Dúvidas',
  description: 'Mitos, verdades e perguntas frequentes sobre Medicina no Paraguai, vestibular, transferência com aproveitamento, Revalida e moradia em Foz.'
};

export default function QuestionsPage() {
  return (
    <>
      <MythsAndFacts showBack />
      <Faq />
    </>
  );
}
