import { markRaw } from 'vue';
import { VTextField } from 'vuetify/components';
import type { FormField } from '@/type/index';
import { requiredRule } from "@/validators"

export const sti3PowerStockFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'db_host',
    props: { label: 'Host - Banco de Dados', variant: 'outlined', maxlength: 10 },
    rules: [requiredRule],
  },
  {
    component: markRaw(VTextField),
    key: 'db_port',
    props: { label: 'Porta - Banco de Dados', variant: 'outlined', maxlength: 4, type: 'number' },
    rules: [requiredRule],
  },
  {
    component: markRaw(VTextField),
    key: 'db_user',
    props: { label: 'Usuário - Banco de Dados', variant: 'outlined', maxlength: 30 },
    rules: [requiredRule],
  },
  {
    component: markRaw(VTextField),
    key: 'db_pass',
    props: { label: 'Senha - Banco de Dados', variant: 'outlined', maxlength: 50 },
    rules: [requiredRule],
  },
  {
    component: markRaw(VTextField),
    key: 'db_name',
    props: { label: 'Nome - Banco de Dados', variant: 'outlined', maxlength: 30 },
    rules: [requiredRule],
  }
];