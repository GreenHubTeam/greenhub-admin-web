import { lazy } from "react"

const ProjectPage = lazy(() => import('@/components/pages/Project'))

export default function ProjectsPage() {
    return <ProjectPage />
}