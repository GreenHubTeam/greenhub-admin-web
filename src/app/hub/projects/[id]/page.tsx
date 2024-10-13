import { lazy } from "react";
const DetailProjectComponent = lazy(() => import('@/components/pages/Project/Detail'));

interface IProjectDetailPage {
    params: {
        id: string;
    }
};

export default function DetailProject({ params: { id } }: IProjectDetailPage) {
    return <DetailProjectComponent id={id} />
}