
import apiClient from '@/api/apiClient';
import { ENDPOINTS } from '@/constants/endpoints';
import { accessService } from './access.service';
import type { AuthResponse } from '@/type';
import { useUserStore } from '@/stores';

export const authService = {
  async login(credentials: object): Promise<boolean> {
    try {
      const response = await apiClient.post<AuthResponse>(ENDPOINTS.LOGIN, credentials);
      const { access, refresh } = response.data;

      if (access) accessService.saveAccess(access);
      if (refresh) accessService.saveRefresh(refresh);

      const userStore = useUserStore();
      await userStore.fetchMyUser();

      return true;
    } catch (error) {
      return false;
    }
  },

  logout(): void {
    accessService.removeAccess();
  },

  async reset_password(credentials: object): Promise<boolean> {
    try {
      await apiClient.post<AuthResponse>(ENDPOINTS.RESET_PASSWORD, credentials);
      return true;
    } catch (error) {
      return false;
    }
  },

  async reset_password_confirm(credentials: object): Promise<boolean> {
    try {
      await apiClient.post<AuthResponse>(ENDPOINTS.RESET_PASSWORD_CONFIRM, credentials);
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  },
};