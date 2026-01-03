export const requiredRule = (value: any): boolean | string => {
    return !!value || 'Este campo é obrigatório.';
  };

export const noLeadingTrailingSpaceRule = (value: string): boolean | string => {
  if (!value) return true;
  return value === value.trim() || 'O campo não deve começar ou terminar com espaços.';
}

export const emailRule = (value: string): boolean | string => {
  if (!value) return true;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value) || 'O e-mail informado não é válido.';
};

export const minLengthRule = (min: number) => {
  return (value: string): boolean | string => {
    if (!value) return true;
    return value.length >= min || `Este campo deve conter no mínimo ${min} caracteres.`;
  };
};

export const comparePasswordRule = (originalValue: string) => {
  return (value: string): boolean | string => {
    return value === originalValue || 'As senhas não conferem.';
  };
};

export const hasNumberRule = (value: string): boolean | string => {
  if (!value) return true;
  return /\d/.test(value) || 'Este campo deve conter ao menos um número.';
};

export const hasLetterRule = (value: string): boolean | string => {
  if (!value) return true;
  return /[a-zA-Z]/.test(value) || 'Este campo deve conter ao menos uma letra.';
};
