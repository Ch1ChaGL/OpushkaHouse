import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IField
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'color' | 'size' | 'placeholder'
  > {
  text: string;
  error?: string;
  mask?: string;
  register: UseFormRegisterReturn;
}
