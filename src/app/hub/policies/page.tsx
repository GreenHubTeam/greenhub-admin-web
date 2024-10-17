import { lazy } from "react";
const PoliciesComponent = lazy(() => import('@/components/pages/Policies'));

export default function PoliciesPage() {
    return <PoliciesComponent />
};