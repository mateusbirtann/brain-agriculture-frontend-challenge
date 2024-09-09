import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  
  let sum = 0;
  let rest;
  for (let i = 1; i <= 9; i++) 
    sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) 
    sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}

export function validateCNPJ(cnpj: string): boolean {
  const cleanCNPJ = cnpj.replace(/[^\d]+/g, '');
  if (cleanCNPJ.length !== 14 || /^(\d)\1+$/.test(cleanCNPJ)) return false;
  
  const calculateDigit = (cnpjSubstring: string): number => {
    let sum = 0;
    let multiplier = 2;
    
    for (let i = cnpjSubstring.length - 1; i >= 0; i--) {
      sum += parseInt(cnpjSubstring.charAt(i)) * multiplier;
      multiplier = multiplier === 9 ? 2 : multiplier + 1;
    }
    
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };
  
  const cnpjBody = cleanCNPJ.substring(0, 12);
  const digit1 = calculateDigit(cnpjBody);
  const digit2 = calculateDigit(cnpjBody + digit1);
  
  return cleanCNPJ === `${cnpjBody}${digit1}${digit2}`;
}