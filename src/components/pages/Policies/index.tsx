'use client'

import { Typography, Grid2 } from "@mui/material";
import CardPolicie from "@/components/ui/cardPolicie";
import { Gavel, Person, PrivacyTip } from "@mui/icons-material";

export default function PoliciesPage() {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={12}>
                <Typography variant="h4" fontWeight={700}>
                    Politicas da plataforma
                </Typography>
            </Grid2>

            <CardPolicie
                policy="lgpd"
                title="LGPD"
                icon={<PrivacyTip fontSize="large" sx={{ marginBottom: 1 }} />}
                description="Conheça as diretrizes de proteção de dados pessoais que seguimos para garantir sua privacidade."
            />

            <CardPolicie
                policy="useterms"
                title="Termos de uso"
                icon={<Person fontSize="large" sx={{ marginBottom: 1 }} />}
                description="Entenda como utilizamos e protegemos seus dados dentro da nossa plataforma."
            />
            <CardPolicie
                policy="policies"
                title="Regras da Plataforma"
                icon={<Gavel fontSize="large" sx={{ marginBottom: 1 }} />}
                description="Saiba mais sobre os termos e condições que regulam o uso da nossa plataforma."
            />

        </Grid2>
    );
}
