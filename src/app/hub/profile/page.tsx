import { lazy } from "react"
const ProfileComponent = lazy(() => import('@/components/pages/Profile'));

export default function ProfilePage() {
    return <ProfileComponent />
}