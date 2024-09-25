// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { maskBr } from 'js-brasil';

export function formatCNPJ(cnpj: string): string {
    return maskBr.cnpj(cnpj);
}
