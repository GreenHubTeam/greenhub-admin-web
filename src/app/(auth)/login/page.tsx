import { lazy } from "react"
const LoginComponent = lazy(() => import('@/components/pages/Login'));

export default function LoginPage() {
    return <LoginComponent />
}