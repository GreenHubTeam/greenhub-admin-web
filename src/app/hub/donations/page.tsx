import { lazy } from "react";
const DonationComponent = lazy(() => import('@/components/pages/Donation'));

export default function DonationPage() {
    return <DonationComponent />
}