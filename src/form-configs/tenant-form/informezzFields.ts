import { markRaw } from 'vue';
import { VTextField } from 'vuetify/components';
import type { FormField } from '@/type/index';
import { requiredRule } from "@/validators"

export const informezzFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'api_key',
    props: { label: 'API Key', variant: 'outlined', maxlength: 50 },
    rules: [requiredRule],
  }
];