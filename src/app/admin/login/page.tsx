'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error ?? 'Erreur inconnue');
        setLoading(false);
      }
    } catch {
      setError('Erreur réseau');
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm px-6">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Élégance Digitale</p>
        <h1 className="text-2xl font-light tracking-widest text-gray-200">Administration</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
          autoFocus
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="current-password"
          className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-gray-100 placeholder-gray-600 focus:border-gray-500 focus:outline-none transition-colors"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gray-700 py-3 text-sm font-medium tracking-widest uppercase text-gray-100 hover:bg-gray-600 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
