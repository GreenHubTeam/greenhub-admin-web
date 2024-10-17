import { lazy } from "react";
const PolicieEditComponent = lazy(() => import('@/components/pages/Policies/edit'));

export default function PolicieEditPage({ params: { policie } }: { params: { policie: string } }) {
    return <PolicieEditComponent policie={policie} />
};