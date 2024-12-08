import React from "react";
import { Typography, IconButton } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import footerStyles from "./footer.module.css";

function Footer() {
    return (
        <footer className={footerStyles.footer_container}>
            <div className={footerStyles.footerContent}>
        
                <div className={footerStyles.logoContainer}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXe4D2gn5i4fnOOCTxOCxvnOsvdIZZCQV_6w&s" alt="Cafetería Logo" className={footerStyles.logo} />
                </div>

                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    className={footerStyles.text}
                >
                    © {new Date().getFullYear()} Harvest. Todos los derechos reservados. Desarrollado por Grupo MarcosdeDesarrollo-UTP.
                </Typography>

                
                <div className={footerStyles.socialIcons}>
                    <IconButton 
                        component="a" 
                        href="https://www.facebook.com/harvestcoffeehouseica/?locale=es_LA" 
                        target="_blank" 
                 
                    >
                        <Facebook />
                    </IconButton>
                    <IconButton 
                        component="a" 
                        href="https://www.instagram.com/harvestcoffeehouse.pe/" 
                        target="_blank" 
                       
                    >
                        <Instagram />
                    </IconButton>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
