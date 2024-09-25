// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { validateBr } from 'js-brasil';

export function isValdiCPF(cpf: string): string {
    return validateBr.cpf(cpf);
}
