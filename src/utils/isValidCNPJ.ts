// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { validateBr } from 'js-brasil';

export function isValidCNPJ(cpf: string): string {
    return validateBr.cnpj(cpf);
}
