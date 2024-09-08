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

export function ModalLoginComponent() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
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
                <Button variant="text" sx={{ color: 'gray' }} onClick={handleClickOpen}>
                    POLITICAS
                </Button>

                <Divider orientation="vertical" flexItem variant="middle" />
                <Button variant="text" sx={{ color: 'gray' }} onClick={handleClickOpen}>
                    TERMOS DE USO
                </Button>

                <Divider orientation="vertical" flexItem variant="middle" />
                <Button variant="text" sx={{ color: 'gray' }} onClick={handleClickOpen}>
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
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}