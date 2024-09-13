'use client'

import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider
} from "@mui/material";

const contentMocks = {
    politicaPlataforma: `
      GreenHub - Política da Plataforma
      
      A GreenHub é uma plataforma dedicada a conectar ONGs que desenvolvem projetos sustentáveis a doadores comprometidos com a preservação do meio ambiente e o desenvolvimento social. Ao utilizar a nossa plataforma, os usuários (ONGs, doadores e administradores) devem seguir as diretrizes abaixo:
      
      - Responsabilidade: As ONGs devem fornecer informações verdadeiras sobre seus projetos e utilizar os recursos de forma responsável e transparente.
      - Aprovação de Projetos: Todos os projetos submetidos pelas ONGs passarão por uma avaliação pelo administrador da plataforma. Somente projetos alinhados aos objetivos de sustentabilidade serão aprovados.
      - Feedback e Doações: Os doadores podem fornecer feedback sobre os projetos e realizar doações financeiras por meio da GreenHub. A plataforma garante que as doações sejam repassadas de forma segura às ONGs.
      - Conduta: Espera-se que todos os usuários mantenham um comportamento respeitoso e ético. Qualquer violação dos nossos princípios resultará em medidas apropriadas, como a suspensão ou banimento de contas.
    `,

    lgpd: `
      GreenHub - Declaração de Conformidade com a LGPD
      
      Na GreenHub, a privacidade dos nossos usuários é uma prioridade. Estamos comprometidos com a proteção dos dados pessoais e seguimos os princípios estabelecidos pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Esta política de privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais:
      
      - Coleta de Dados: Coletamos informações pessoais apenas para os propósitos específicos da nossa plataforma, como cadastro de ONGs e doadores, processamento de doações e comunicação com os usuários.
      - Uso de Dados: As informações coletadas são usadas exclusivamente para facilitar a interação entre ONGs e doadores, além de permitir a administração da plataforma.
      - Segurança: Adotamos medidas técnicas e organizacionais para proteger os dados pessoais contra acesso não autorizado, perda ou destruição.
      - Direitos dos Usuários: Os usuários têm o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento, além de poderem solicitar informações sobre como seus dados estão sendo tratados.
      - Compartilhamento de Dados: Não compartilhamos dados pessoais com terceiros sem o consentimento explícito do usuário, exceto quando exigido por lei.
    `,

    termosUso: `
      GreenHub - Termos de Uso
      
      Estes Termos de Uso regem o uso da plataforma GreenHub por ONGs, doadores e administradores. Ao acessar e utilizar nossos serviços, você concorda com os seguintes termos:
      
      - Cadastro: Para utilizar a GreenHub, você deve fornecer informações precisas e atualizadas ao se cadastrar. O uso de informações falsas poderá resultar no cancelamento do seu acesso à plataforma.
      - Serviços: A GreenHub é uma plataforma que facilita a criação, divulgação e apoio a projetos sustentáveis. A plataforma oferece ferramentas para doação, feedback e monitoramento de projetos, sem cobrar taxas de administração sobre doações realizadas.
      - Responsabilidades: As ONGs são responsáveis por fornecer informações precisas sobre seus projetos e prestar contas de como os recursos doados serão utilizados. Os doadores, por sua vez, são responsáveis por avaliar as ONGs antes de realizar doações.
      - Restrições: É proibido o uso da plataforma para atividades ilegais, fraudulentas ou que não estejam em conformidade com os objetivos de sustentabilidade da GreenHub.
      - Suspensão de Conta: A GreenHub reserva-se o direito de suspender ou encerrar contas de usuários que violarem estes Termos de Uso ou as diretrizes da plataforma.
    `
};

export function ModalLoginComponent() {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const handleClickOpen = (contentType: string) => {
        if (contentType === 'policies') {
            setContent(contentMocks.politicaPlataforma)
            setTitle("Politicas da plataforma")
        }

        if (contentType === 'terms') {
            setContent(contentMocks.termosUso)
            setTitle("Termos de uso")
        }

        if (contentType === 'lgpd') {
            setContent(contentMocks.lgpd)
            setTitle("LGPD")
        }

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Button variant="text" sx={{ color: 'gray' }} onClick={() => handleClickOpen('policies')}>
                    POLITICAS
                </Button>

                <Divider orientation="vertical" flexItem variant="middle" />
                <Button variant="text" sx={{ color: 'gray' }} onClick={() => handleClickOpen('terms')}>
                    TERMOS DE USO
                </Button>

                <Divider orientation="vertical" flexItem variant="middle" />
                <Button variant="text" sx={{ color: 'gray' }} onClick={() => handleClickOpen('lgpd')}>
                    LGPD
                </Button>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Aceitar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}