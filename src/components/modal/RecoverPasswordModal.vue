<template>
  <BaseModal
    v-model="dialogModal"
    title="Recuperar Senha"
    primaryLabel="Enviar"
    :onPrimaryAction="handleRecovery"
  >
    <v-alert
      :type="alertType"
      density="compact"
      class="ma-4 mt-6 text-caption"
      variant="tonal"
      :text="alertMessage"
    />
    <v-card-text>
      <v-text-field
        v-model="recoveryEmail"
        label="E-mail*"
        type="email"
        density="comfortable"
        prepend-inner-icon="mdi-email"
        :rules="[emailRule]"
        required
        class="mb-4"
        @blur="normalizeEmail"
      />
      <small>*Campo obrigatório</small>
    </v-card-text>
  </BaseModal>
</template>

<script setup lang="ts">
  import { ref, defineExpose } from 'vue';
  import { emailRule } from '@/validators';
  import { authService } from '@/services/authService';

  const props = defineProps<{ email: string }>();
  const emit = defineEmits(['success']);

  const dialogModal = defineModel<boolean>({ default: false });

  const alertType = ref<'error' | 'success' | 'info' | 'warning'>('info');
  const alertMessage = ref('Por favor, informe seu e-mail. Em instantes, você receberá um link para redefinir sua senha.');
  const recoveryEmail = ref(props.email);

  watch(dialogModal, (isOpen) => {
    if (isOpen) {
      recoveryEmail.value = props.email;
      alertType.value = 'info';
      alertMessage.value = 'Por favor, informe seu e-mail. Em instantes, você receberá um link para redefinir sua senha.';
    } else {
      recoveryEmail.value = '';
    }
  });

  const handleRecovery = async () => {
    const email = recoveryEmail.value;

    const isValid = emailRule(email);
    if (!email || isValid !== true) {
      alertType.value = 'error';
      alertMessage.value = 'Parece que houve um erro no e-mail informado. Verifique se ele está completo e em um formato válido.';
      return;
    }

    const result = await authService.reset_password({
      email: email,
    });
    if (!result) {
      alertType.value = 'error';
      alertMessage.value = 'Não foi possível realizar o envio do link de recuperação de senha. Atualize a página e tente novamente.';
      return;
    }

    emit('success', email);
    dialogModal.value = false;
  }

  function normalizeEmail() {
    recoveryEmail.value = recoveryEmail.value.replace(/\s+/g, "").toLowerCase()
  }
  
  defineExpose({ open });
</script>
