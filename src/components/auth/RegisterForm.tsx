'use client';

import { useState } from 'react';
import { authAPI, GameMaster } from '@/lib/api';
import axios from 'axios';

interface RegisterFormProps {
  onSuccess?: (gameMaster: GameMaster) => void;
  onSwitchToLogin?: () => void;
}

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro ao digitar
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (!formData.name.trim()) {
      setError('O nome é obrigatório');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const gameMaster: GameMaster = {
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
      };

      const response = await authAPI.register(gameMaster);
      
      setSuccess(true);
      
      // Callback de sucesso
      if (onSuccess) {
        onSuccess(response);
      } else {
        // Auto switch para login após 2 segundos
        setTimeout(() => {
          if (onSwitchToLogin) {
            onSwitchToLogin();
          }
        }, 2000);
      }
    } catch (err: unknown) {
      console.error('Erro no registro:', err);
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 409) {
          setError('Este email já está cadastrado');
        } else if (status === 400) {
          setError('Dados inválidos. Verifique os campos preenchidos.');
        } else if ((status ?? 0) >= 500) {
          setError('Erro no servidor. Tente novamente mais tarde.');
        } else {
          setError('Erro ao criar conta. Verifique sua conexão.');
        }
      } else {
        setError('Erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-md body-s">
          ✅ Conta criada com sucesso!
        </div>
        <p className="text-secondary body-s">
          Redirecionando para o login...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md body-s">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-secondary label-s mb-2">
          NOME:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={loading}
          className="w-full px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-500 body-m focus:outline-none border-focus transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

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
          placeholder="Mínimo 6 caracteres"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-secondary label-s mb-2">
          CONFIRMAR SENHA:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          disabled={loading}
          className="w-full px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-500 body-m focus:outline-none border-focus transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Digite a senha novamente"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-ouro-500 text-inverse py-3 px-4 rounded-md hover-bg-brand-ouro-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 button-m transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'CRIANDO CONTA...' : 'CRIAR CONTA'}
      </button>
    </form>
  );
};

export default RegisterForm;