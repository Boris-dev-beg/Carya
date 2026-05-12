'use client'; // ! important
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1a1a1a', // ? Couleur principale : Noir Antracite (Elegance)
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#d4af37', // ? Couleur secondaire : Or mat (Premium)
            contrastText: '#1a1a1a',
        },
        background: {
            default: '#FFFFFF', // ? Font Blanc pur pour la clarte
            paper: '#fbfbfb', // ? Gris extremement leger pour les  cartes
        },
    },
    shape: {
        borderRadius: 4, // ? Des coins un peu 'Tranchants' 
    },
    typography: {
        fontFamily: 'Bahnschrift, Arial,sans-serif',
        button: {
            textTransform: 'none', // ? Enleve les majuscule automatique sur les boutons
            fontWeight: 600,
        },
    },
});

export default theme;