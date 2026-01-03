<route lang="yaml">
  meta:
    layout: blank
</route>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <v-col class="bg-primary">
        <div class="d-flex fill-height justify-center align-center ma-6">
          <v-img
            src="@/assets/MV Core - LOGO COM SLOGAN - COLOR E BRANCO.png"
            max-width="70%"
            alt="Logotipo do sistema MVCore"
          ></v-img>
        </div>
      </v-col>

      <v-col cols="12" md="5" class="d-flex align-center justify-center bg-lightbackground">
        <v-sheet width="100%" max-width="450" class="pa-8 ma-4 bg-secondary text-primary" rounded="lg" elevation="3">
          <h1 class="text-h4 font-weight-bold mb-10">Nova senha</h1>

          <v-form ref="formRef" validate-on="submit" @submit.prevent="handleNewPassword">
            <v-alert
              v-if="showAlert"
              :type="alertType"
              density="compact"
              class="mb-8 text-caption"
              variant="tonal"
              :text="alertMessage"
            ></v-alert>

            <v-text-field
              v-if="showFields"
              label="Nova senha"
              variant="outlined"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
              class="mb-4"
              v-model="password"
              density="comfortable"
              :error="showFieldError"
              :rules="[requiredRule, comparePasswordRule(passwordConfirm), hasNumberRule, hasLetterRule, minLengthRule(6)]"
            ></v-text-field>

            <v-text-field
              v-if="showFields"
              label="Repita a nova senha"
              variant="outlined"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
              v-model="passwordConfirm"
              density="comfortable"
              :error="showFieldError"
              :rules="[requiredRule, comparePasswordRule(password), hasNumberRule, hasLetterRule, minLengthRule(6)]"
            ></v-text-field>

            <v-btn
              block
              color="primary"
              size="large"
              class="mt-10"
              type="submit"
              :loading="loading"
            >
              Alterar senha
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { authService } from '@/services/authService';
import { requiredRule, comparePasswordRule, hasNumberRule, hasLetterRule, minLengthRule } from '@/validators';

const router = useRouter();
const route = useRoute();

const id = route.query.id;
const token = route.query.token;
const password = ref('');
const passwordConfirm = ref('');
const formRef = ref();
const loading = ref(false);

const alertType = ref<'error' | 'success' | 'info' | 'warning'>('error');
const alertMessage = ref<string | undefined>();
const showAlert = ref(false);
const showFields = ref(true);
const showFieldError = ref(false);

const handleNewPassword = async () => {
  clearAlert()

  const {valid} = await formRef.value.validate();
  if (!valid) {
    return;
  }

  loading.value = true;

  try {
    const result = await authService.reset_password_confirm({
      uid: id,
      token: token,
      new_password: password.value
    });

    showAlert.value = true;
    if (!result) {
      showFieldError.value = true;
      alertType.value = 'error';
      alertMessage.value = 'Não foi possível alterar a senha. Solicite um novo token e tente novamente.';
    } else {
      showFields.value = false;      
      alertType.value = 'success';
      alertMessage.value = 'Sua senha foi redefinida, estamos te redirecionando para a tela de acesso.';
      await sleep(5000);
      router.push('/')
    }
  } finally {
    loading.value = false;
  }
};

function clearAlert() {
  showAlert.value = false;
  showFieldError.value = false;
  alertMessage.value = '';
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
</script>