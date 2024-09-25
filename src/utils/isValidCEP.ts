// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { validateBr } from 'js-brasil';

export function isValidCEP(cep: string): string {
    return validateBr.cep(cep);
}
