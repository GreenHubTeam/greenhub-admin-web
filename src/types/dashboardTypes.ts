export interface IDashboardType {
    totalUsers: number;
    totalOngs: number;
    totalDonors: number;
    totalProjects: number;
    totalProjectsApproved: number;
    totalProjectsReproved: number;
    dataChartUsers: { label: string, value: number }[]
    dataChartProject: { label: string, value: number }[]
}