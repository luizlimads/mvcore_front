import type { FormField } from '@/type/index';
import { baseFields as bFields } from './baseFields';
import { ssoticaFields } from './ssoticaFields';
import { sti3PowerStockFields } from './sti3PowerStockFields';
import { informezzFields } from './informezzFields';

// Mapa de campos específicos por nome do sistema
const systemSpecificFields: Record<string, FormField[]> = {
  'ssOtica': ssoticaFields,
  'STi3 - Power Stock': sti3PowerStockFields,
  'Informezz': informezzFields,
};

export const baseFields = bFields;
export { systemSpecificFields };