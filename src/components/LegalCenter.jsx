import React from 'react';
import { Cookie, Database, FileCheck2, LockKeyhole, Scale, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteContent';

const privacyChannel = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
  'Olá! Quero falar sobre meus dados pessoais e direitos de privacidade.'
)}`;

export default function LegalCenter() {
  return (
    <section id="privacidade" className="frame frame-cream">
      <div className="container">
        <Link to="/" className="route-back-link">← Voltar para Medicina no Paraguai</Link>
        <div className="section-intro">
          <div className="badge-pill badge-navy">
            <LockKeyhole size={16} />
            <span>Privacidade e transparência</span>
          </div>
          <h2>Seus dados, suas escolhas.</h2>
          <p>
            Explicamos como as informações enviadas neste site são usadas, compartilhadas
            e protegidas, além dos seus direitos previstos na LGPD.
          </p>
        </div>

        <div className="legal-summary-grid">
          <article className="legal-summary-card">
            <Database size={22} />
            <div>
              <h3>O que tratamos</h3>
              <p>Dados cadastrais, contato, interesse acadêmico e informações profissionais enviadas voluntariamente.</p>
            </div>
          </article>
          <article className="legal-summary-card">
            <UserCheck size={22} />
            <div>
              <h3>Para que usamos</h3>
              <p>Atendimento, pré-matrícula, orçamento, avaliação de parceiros e cumprimento de obrigações legais.</p>
            </div>
          </article>
          <article className="legal-summary-card">
            <Scale size={22} />
            <div>
              <h3>Você mantém o controle</h3>
              <p>É possível solicitar acesso, correção, informação, oposição, revogação ou eliminação quando aplicável.</p>
            </div>
          </article>
        </div>

        <div className="legal-details">
          <details>
            <summary><FileCheck2 size={19} /> Política de Privacidade e tratamento de dados</summary>
            <div>
              <p><strong>Controlador:</strong> Travessia Med. O canal para assuntos de privacidade é o WhatsApp informado neste site.</p>
              <p><strong>Dados coletados:</strong> nome, WhatsApp, localidade, preferências acadêmicas, dados profissionais de candidatos a parceiros, e-mail da conta Gmail usada no envio e qualquer informação incluída voluntariamente nas mensagens.</p>
              <p><strong>Finalidades:</strong> responder solicitações, prestar orientação, realizar procedimentos pré-contratuais, organizar atendimento, avaliar prestadores e manter registros necessários à defesa de direitos e ao cumprimento de obrigações legais.</p>
              <p><strong>Bases legais:</strong> consentimento, execução de procedimentos preliminares relacionados a contrato, legítimo interesse com avaliação de impacto e cumprimento de obrigação legal ou regulatória, conforme o caso.</p>
            </div>
          </details>

          <details>
            <summary><Database size={19} /> Compartilhamento, armazenamento e segurança</summary>
            <div>
              <p>Os formulários exigem login com Gmail. Cada conta envia um pedido por tipo (admissão ou parceria). A leitura e a correção dos registros ficam restritas a operadores autorizados. Google, Supabase e a hospedagem na Vercel participam desse processamento técnico conforme suas próprias políticas.</p>
              <p>Informações poderão ser compartilhadas com universidades, consultores ou prestadores somente quando necessário ao serviço solicitado e com ciência do titular. Parceiros não recebem listas gerais de contatos.</p>
              <p>Registros são mantidos apenas pelo período necessário ao atendimento, à relação contratual e aos prazos legais aplicáveis. São adotadas medidas razoáveis de acesso restrito, organização e prevenção contra uso indevido.</p>
            </div>
          </details>

          <details>
            <summary><Cookie size={19} /> Cookies, hospedagem e serviços externos</summary>
            <div>
              <p>O site não instala cookies próprios de publicidade ou perfil comportamental. O login com Google e a hospedagem podem processar dados técnicos como endereço IP, navegador, data e hora.</p>
              <p>Ao abrir links externos, como WhatsApp, o usuário passa a utilizar serviços sujeitos aos termos e políticas desses fornecedores. Caso ferramentas de análise ou marketing sejam adicionadas, esta política e os mecanismos de consentimento deverão ser atualizados.</p>
            </div>
          </details>

          <details>
            <summary><Scale size={19} /> Termos de uso e responsabilidade</summary>
            <div>
              <p>O conteúdo tem caráter informativo. Mensalidades, câmbio, regras acadêmicas, migratórias e de revalidação podem mudar e devem ser confirmados antes de qualquer contratação ou decisão.</p>
              <p>Prestadores da rede são independentes, apresentam orçamento próprio e respondem pela execução dos serviços. O cadastro não garante credenciamento, indicação ou volume mínimo de solicitações.</p>
              <p>Não é permitido copiar a identidade, usar o site para finalidade ilícita ou enviar dados de terceiros sem autorização.</p>
            </div>
          </details>
        </div>

        <div className="legal-contact">
          <div>
            <strong>Quer exercer um direito sobre seus dados?</strong>
            <span>Identificaremos sua solicitação antes de responder para proteger o próprio titular.</span>
          </div>
          <a href={privacyChannel} target="_blank" rel="noreferrer" className="btn btn-navy">
            Falar sobre meus dados
          </a>
        </div>

        <p className="legal-updated">Última atualização: 19 de agosto de 2026.</p>
      </div>
    </section>
  );
}
