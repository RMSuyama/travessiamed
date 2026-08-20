import { supabasePublic } from './supabaseClient';
import { isGmailAddress } from './useAuth';

const TYPE_LABELS = {
  admission: 'Pré-matrícula / admissão',
  partner: 'Cadastro de parceiro'
};

function readText(value, maxLength, required = false) {
  const text = typeof value === 'string' ? value.trim() : '';
  if (required && !text) throw new Error('Preencha todos os campos obrigatórios.');
  if (text.length > maxLength) throw new Error('Um dos campos ultrapassou o tamanho permitido.');
  return text;
}

export function createWhatsAppUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export async function submitContactForm(payload) {
  if (readText(payload.website, 200)) {
    return { success: true };
  }

  const googleEmail = readText(payload.googleEmail || payload.email, 160, true).toLowerCase();
  if (!isGmailAddress(googleEmail)) {
    throw new Error('Informe um Gmail válido, por exemplo nome@gmail.com.');
  }

  const type = readText(payload.type, 20, true);
  if (!TYPE_LABELS[type]) throw new Error('Tipo de formulário inválido.');

  const row = {
    type,
    type_label: TYPE_LABELS[type],
    name: readText(payload.name, 120, true),
    whatsapp: readText(payload.whatsapp, 40, true),
    location: readText(payload.location, 120, true),
    interest: readText(payload.interest, 160, true),
    semester: readText(payload.semester, 80) || null,
    housing: readText(payload.housing, 160) || null,
    experience: readText(payload.experience, 1200) || null,
    source: readText(payload.source, 300) || null,
    google_email: googleEmail
  };

  const { error } = await supabasePublic.from('contacts').insert(row);
  if (error) {
    if (error.code === '23505') {
      throw new Error('Este Gmail já enviou. Se algo estiver errado, fale com a equipe para corrigirmos no painel.');
    }
    console.error('Supabase insert error:', error.message);
    throw new Error('Não foi possível salvar agora. Tente novamente.');
  }

  return { success: true };
}
