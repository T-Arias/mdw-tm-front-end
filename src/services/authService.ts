import type { User } from '../types/user';
import api from './api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse extends User {
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
    },
};