import { lazy } from "react";
const OngComponent = lazy(() => import('@/components/pages/Ong'));

export default function OngPage() {
    return <OngComponent />
}