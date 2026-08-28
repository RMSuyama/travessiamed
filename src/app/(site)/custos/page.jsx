import CostOfLiving from '../../../components/CostOfLiving';
import SavingsCalculator from '../../../components/SavingsCalculator';

export const metadata = {
  title: 'Custos',
  description: 'Mensalidades da UCP, custo de vida em Foz do Iguaçu e simulador de economia.'
};

export default function CostsPage() {
  return (
    <>
      <CostOfLiving showBack />
      <SavingsCalculator />
    </>
  );
}
