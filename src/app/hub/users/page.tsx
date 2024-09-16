import { lazy } from "react";
const UserComponent = lazy(() => import('@/components/pages/User'));

export default function UserPage() {
    return <UserComponent />
}