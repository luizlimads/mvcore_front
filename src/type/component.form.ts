import type { Component } from 'vue'

type VTextFieldVariant = 'outlined' | 'plain' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'

export interface FieldProps {
  [key: string]: any;

  variant: VTextFieldVariant
  label: string
  items?: any[]
  itemTitle?: string
  itemValue?: string
  maxlength?: number
  type?: string
  counter?: boolean
  readonly?: boolean
  appendInnerIcon?: string
}

export interface FormField {
  component: Component
  key: string
  props: FieldProps
  rules?: any[]
}

export interface FormConfig {
  title: string
  fields: FormField[]
}