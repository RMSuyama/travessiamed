import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: session?.user || null,
    loading
  };
}

export function isGmailUser(user) {
  if (!user) return false;
  const email = String(user.email || '').trim().toLowerCase();
  return email.endsWith('@gmail.com') || email.endsWith('@googlemail.com');
}

export function isGoogleGmailUser(user) {
  return isGmailUser(user);
}

export function authReturnUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete('code');
  url.searchParams.delete('error');
  url.searchParams.delete('error_description');
  return `${url.origin}${url.pathname}${url.hash || ''}`;
}

export function isGmailAddress(value) {
  const email = String(value || '').trim().toLowerCase();
  return /^[^\s@]+@(gmail\.com|googlemail\.com)$/.test(email);
}

export async function sendGmailAccessLink(email, redirectTo = authReturnUrl()) {
  if (!isGmailAddress(email)) {
    return new Error('Use um endereço Gmail.');
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true
    }
  });
  return error;
}
