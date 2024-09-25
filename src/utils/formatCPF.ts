// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { maskBr } from 'js-brasil';

export function formatCPF(cpf: string): string {
    return maskBr.cpf(cpf);
}
