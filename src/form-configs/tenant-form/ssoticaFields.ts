import { markRaw } from 'vue';
import { VTextField } from 'vuetify/components';
import type { FormField } from '@/type/index';
import { requiredRule } from "@/validators"

export const ssoticaFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'api_document',
    props: { label: 'Documento API', variant: 'outlined', maxlength: 50 },
    rules: [requiredRule],
  },
  {
    component: markRaw(VTextField),
    key: 'api_user',
    props: { label: 'Usuário API', variant: 'outlined', maxlength: 50 },
    rules: [requiredRule],
  },
  {
    component: markRaw(VTextField),
    key: 'api_token',
    props: { label: 'Token API', variant: 'outlined', maxlength: 70 },
    rules: [requiredRule],
  },
  {
    component: markRaw(VTextField),
    key: 'imposto_aliquota_padrao',
    props: { label: 'Alíquota Média de Imposto (%)', variant: 'outlined', maxlength: 10, type: 'number' },
    rules: [(value: string) => !isNaN(parseFloat(value)) || 'Deve ser um número válido'],
  },
];