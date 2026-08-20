import React, { useEffect, useMemo, useState } from 'react';
import { LogOut, MessageCircle } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { createWhatsAppUrl } from '../utils/formSubmission';
import {
  digitsOnly,
  normalizeEmail
} from '../utils/adminAccess';

const STATUS_OPTIONS = [
  { value: 'novo', label: 'Novo' },
  { value: 'em_contato', label: 'Em contato' },
  { value: 'concluido', label: 'Concluído' }
];

function formatWhen(value) {
  return new Date(value).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function SharkPage() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const email = normalizeEmail(session?.user?.email);

  useEffect(() => {
    document.documentElement.classList.add('shark-mode');
    document.title = 'Shark';
    return () => {
      document.documentElement.classList.remove('shark-mode');
      document.title = 'Travessia Med';
    };
  }, []);

  useEffect(() => {
    let active = true;

    const sync = async (nextSession) => {
      setSession(nextSession);
      if (!nextSession?.user) {
        setAllowed(false);
        setContacts([]);
        setChecking(false);
        return;
      }

      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');
      if (!active) return;
      if (adminError || !isAdmin) {
        setAllowed(false);
        setError('Sem acesso ao painel.');
        setChecking(false);
        return;
      }

      const { error: deskError } = await loadDesk();
      if (!active) return;

      if (deskError) {
        setAllowed(false);
        setError(deskError);
        setChecking(false);
        return;
      }

      setAllowed(true);
      setError('');
      setChecking(false);
    };

    supabase.auth.getSession().then(({ data }) => {
      if (active) sync(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      sync(nextSession);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const loadDesk = async () => {
    const { data: rows, error: contactError } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (contactError) {
      return { error: 'Usuário autenticado, mas sem permissão de leitura. Rode o schema.sql no Supabase.' };
    }

    setContacts(rows || []);
    return { error: '' };
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return contacts.filter((row) => {
      if (typeFilter !== 'all' && row.type !== typeFilter) return false;
      if (statusFilter !== 'all' && row.status !== statusFilter) return false;
      if (!needle) return true;
      return [row.name, row.whatsapp, row.location, row.interest, row.experience, row.google_email]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    });
  }, [contacts, query, typeFilter, statusFilter]);

  const enterWithPassword = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailValue = normalizeEmail(form.email.value);
    const password = form.password.value;
    if (!emailValue || !password) return;

    setBusy(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password
    });
    setBusy(false);

    if (!authError) return;

    if (/invalid login/i.test(authError.message)) {
      setError('E-mail ou senha inválidos.');
      return;
    }
    if (/email not confirmed/i.test(authError.message)) {
      setError('Confirme o usuário no Auth do Supabase (Auto Confirm) e tente de novo.');
      return;
    }
    setError(authError.message || 'Não foi possível entrar.');
  };

  const updateStatus = async (id, status) => {
    const { error: updateError } = await supabase.from('contacts').update({
      status,
      updated_at: new Date().toISOString()
    }).eq('id', id);
    if (updateError) {
      setError('Não foi possível atualizar o status.');
      return;
    }
    setContacts((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));
    setEditing((current) => (current?.id === id ? { ...current, status } : current));
  };

  const openEdit = (row) => {
    setEditing({
      id: row.id,
      name: row.name || '',
      whatsapp: row.whatsapp || '',
      location: row.location || '',
      interest: row.interest || '',
      semester: row.semester || '',
      housing: row.housing || '',
      experience: row.experience || '',
      admin_notes: row.admin_notes || '',
      status: row.status || 'novo',
      google_email: row.google_email || ''
    });
    setError('');
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    setError('');
    const payload = {
      name: editing.name.trim(),
      whatsapp: editing.whatsapp.trim(),
      location: editing.location.trim(),
      interest: editing.interest.trim(),
      semester: editing.semester.trim() || null,
      housing: editing.housing.trim() || null,
      experience: editing.experience.trim() || null,
      admin_notes: editing.admin_notes.trim() || null,
      status: editing.status,
      updated_at: new Date().toISOString()
    };
    const { error: updateError } = await supabase.from('contacts').update(payload).eq('id', editing.id);
    setSaving(false);
    if (updateError) {
      setError('Não foi possível salvar a correção.');
      return;
    }
    setContacts((current) => current.map((row) => (
      row.id === editing.id ? { ...row, ...payload } : row
    )));
  };

  const editField = (field) => (event) => {
    setEditing((current) => ({ ...current, [field]: event.target.value }));
  };

  if (checking) {
    return (
      <div className="shark-root">
        <p className="shark-quiet">…</p>
      </div>
    );
  }

  if (!session || !allowed) {
    return (
      <div className="shark-root">
        <section className="shark-gate">
          <p className="shark-mark">Shark</p>
          <form className="shark-login" onSubmit={enterWithPassword}>
            <input
              name="email"
              type="email"
              autoComplete="username"
              placeholder="e-mail"
              required
            />
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="senha"
              required
            />
            <button type="submit" disabled={busy}>Entrar</button>
          </form>
          {error && <p className="shark-error">{error}</p>}
        </section>
      </div>
    );
  }

  return (
    <div className="shark-root shark-desk">
      <header className="shark-bar">
        <p>Shark</p>
        <span>{email}</span>
        <button type="button" onClick={() => supabase.auth.signOut()}>
          <LogOut size={14} /> Sair
        </button>
      </header>

      <section className="shark-toolbar">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar nome, WhatsApp, cidade"
        />
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option value="all">Todos</option>
          <option value="admission">Admissão</option>
          <option value="partner">Parceiro</option>
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">Qualquer status</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <strong>{filtered.length}</strong>
      </section>

      {error && <p className="shark-error shark-inline">{error}</p>}

      <div className="shark-table-wrap">
        <table className="shark-table">
          <thead>
            <tr>
              <th>Quando</th>
              <th>Tipo</th>
              <th>Nome</th>
              <th>WhatsApp</th>
              <th>Origem</th>
              <th>Interesse</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td>{formatWhen(row.created_at)}</td>
                <td>{row.type === 'partner' ? 'Parceiro' : 'Admissão'}</td>
                <td>
                  <strong>{row.name}</strong>
                  {row.semester && <small>{row.semester}</small>}
                  {row.housing && <small>{row.housing}</small>}
                  {row.experience && <small>{row.experience}</small>}
                </td>
                <td>
                  <a
                    href={createWhatsAppUrl(digitsOnly(row.whatsapp), `Olá, ${row.name}. Sou da Travessia Med.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={13} /> {row.whatsapp}
                  </a>
                </td>
                <td>{row.location}</td>
                <td>{row.interest}</td>
                <td>
                  <select
                    value={row.status || 'novo'}
                    onChange={(event) => updateStatus(row.id, event.target.value)}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button type="button" className="shark-edit-btn" onClick={() => openEdit(row)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="shark-quiet">Nenhum registro.</p>}
      </div>

      {editing && (
        <form className="shark-editor" onSubmit={saveEdit}>
          <div className="shark-editor-head">
            <p>Corrigir dados</p>
            <span>{editing.google_email || 'sem Gmail'}</span>
            <button type="button" onClick={() => setEditing(null)}>Fechar</button>
          </div>
          <div className="shark-editor-grid">
            <label>
              Nome
              <input value={editing.name} onChange={editField('name')} required />
            </label>
            <label>
              WhatsApp
              <input value={editing.whatsapp} onChange={editField('whatsapp')} required />
            </label>
            <label>
              Origem
              <input value={editing.location} onChange={editField('location')} required />
            </label>
            <label>
              Interesse
              <input value={editing.interest} onChange={editField('interest')} required />
            </label>
            <label>
              Semestre
              <input value={editing.semester} onChange={editField('semester')} />
            </label>
            <label>
              Moradia
              <input value={editing.housing} onChange={editField('housing')} />
            </label>
            <label className="shark-editor-wide">
              Experiência / observações do cliente
              <textarea value={editing.experience} onChange={editField('experience')} rows="3" />
            </label>
            <label className="shark-editor-wide">
              Nota interna
              <textarea value={editing.admin_notes} onChange={editField('admin_notes')} rows="3" />
            </label>
          </div>
          <button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar correção'}
          </button>
        </form>
      )}
    </div>
  );
}
