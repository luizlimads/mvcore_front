import { markRaw } from 'vue';
import { VTextField, VSelect } from 'vuetify/components';
import { requiredRule ,emailRule, noLeadingTrailingSpaceRule } from "@/validators"
import type { FormField } from "@/type/index"


export const baseFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'nome',
    props: { label: 'Nome completo*', variant: 'outlined', maxlength: 255 },
    rules:[requiredRule, noLeadingTrailingSpaceRule],
  },
  
];