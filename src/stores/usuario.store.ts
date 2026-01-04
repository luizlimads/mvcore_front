import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usuarioService } from '@/services';
import type { Usuario } from '@/type';

export const useUsuarioStore = defineStore('user', () => {
  const users = ref<Usuario[]>([]);
  const myUser = ref<Usuario | null>(null);

  async function fetchAllUsuarios(force: boolean = false) {
    if (users.value.length > 0 && !force) return;
    try {
      const response = await usuarioService.fetchAll();
      users.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os usuários:", error);
    }
  }
  
  async function fetchMyUser(force: boolean = false) {
    if (myUser.value && !force) return;
    try {
      const initialUser = await usuarioService.fetchMe();
      const id = initialUser.data.id
      const response = await usuarioService.fetch(id);
      myUser.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário logado:", error);
    }
  }

  function addUser(newUser: Usuario) {
    users.value.push(newUser);
  }

  function resetState() {
    users.value = [];
    myUser.value = null;
  }

  return { 
    users, 
    myUser, 
    fetchAllUsuarios,
    fetchMyUser, 
    addUser,
    resetState
  };
});