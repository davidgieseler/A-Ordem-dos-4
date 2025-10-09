'use client';

import { useState } from 'react';
import { authAPI, setToken, LoginRequest } from '@/lib/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro ao digitar
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      // Salvar token
      setToken(response.token);
      
      // Callback de sucesso ou redirecionamento
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      console.error('Erro no login:', err);
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401) {
          setError('Email ou senha incorretos');
        } else if ((status ?? 0) >= 500) {
          setError('Erro no servidor. Tente novamente mais tarde.');
        } else {
          setError('Erro ao fazer login. Verifique sua conexão.');
        }
      } else {
        setError('Erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md body-s">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-secondary label-s mb-2">
          EMAIL:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={loading}
          className="w-full px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-500 body-m focus:outline-none border-focus transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="seu.email@exemplo.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-secondary label-s mb-2">
          SENHA:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          disabled={loading}
          className="w-full px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-500 body-m focus:outline-none border-focus transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Sua senha"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-ouro-500 text-inverse py-3 px-4 rounded-md hover-bg-brand-ouro-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 button-m transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'ENTRANDO...' : 'ENTRAR'}
      </button>
    </form>
  );
};

export default LoginForm;