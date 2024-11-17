import { AccountBox, Assessment, Category, CorporateFare, Dashboard, LocalPolice, VolunteerActivism } from "@mui/icons-material";

export const linksNavs = [
    {
        name: 'Dashboard',
        path: '/hub/dashboard',
        icon: <Dashboard />
    },
    {
        name: 'ONGs',
        path: '/hub/ongs',
        icon: <CorporateFare />
    },
    {
        name: 'Usuarios',
        path: '/hub/users',
        icon: <AccountBox />
    },
    {
        name: 'Projetos',
        path: '/hub/projects',
        icon: <Assessment />
    },
    {
        name: "Politicas",
        path: "/hub/policies",
        icon: <LocalPolice />
    },
    {
        name: "Categorias",
        path: "/hub/categories",
        icon: <Category />
    },
    {
        name: "Doações",
        path: '/hub/donations',
        icon: <VolunteerActivism />
    }
]