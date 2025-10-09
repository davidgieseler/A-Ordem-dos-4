import axios, { AxiosInstance } from 'axios';

export interface GameMaster {
  name: string;
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  gameMaster: GameMaster;
}

export interface Campaign {
  id: string;
  name: string;
  code: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  createdAt: string;
}

export interface CreateCampaignRequest {
  name: string;
}

// Funções para gerenciar o token JWT
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token');
  }
  return null;
};

export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt_token', token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt_token');
  }
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

// Criar instância do axios
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT automaticamente
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    // Não adicionar token para rotas de login e cadastro
    const isAuthRoute = config.url?.includes('/auth/') || config.url?.includes('/game-masters');
    
    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se receber 401, remover token e redirecionar para login
    if (error.response?.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

// Funções específicas da API
export const authAPI = {
  // Fazer login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Registrar novo Game Master
  register: async (gameMaster: GameMaster): Promise<GameMaster> => {
    const response = await api.post('/game-masters', gameMaster);
    return response.data;
  },
};

export const campaignAPI = {
  // Listar todas as campanhas do mestre logado
  getAll: async (): Promise<Campaign[]> => {
    const response = await api.get('/campaigns');
    return response.data;
  },

  // Buscar uma campanha específica por ID
  getById: async (id: string): Promise<Campaign> => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  // Criar nova campanha
  create: async (campaign: CreateCampaignRequest): Promise<Campaign> => {
    const response = await api.post('/campaigns', campaign);
    return response.data;
  },

  // Atualizar campanha (para futura implementação)
  update: async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
    const response = await api.put(`/campaigns/${id}`, campaign);
    return response.data;
  },

  // Deletar campanha (para futura implementação)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/campaigns/${id}`);
  },
};

export default api;