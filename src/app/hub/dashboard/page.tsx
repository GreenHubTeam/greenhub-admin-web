import { lazy } from "react";
const DashboardComponent = lazy(() => import('@/components/pages/Dashboard'));

export default function Page() {
    return <DashboardComponent />
}