import { lazy } from "react";

const OngProfileComponent = lazy(() => import('@/components/pages/Ong/Profile'));

export default function OngProfilePage({ params: { id } }: { params: { id: string } }) {
    return <OngProfileComponent ongId={id} />
}