import { Typography, IconButton, Badge, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import headerStyles from './header.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History'; 
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth';

function Header() {
  let navigate = useNavigate();
  let [number, setNumber] = useState(0);

  const [roles, setRoles] = useState([]); // Roles array to check its length

  // Obtiene el número de productos en el carrito desde localStorage
  useEffect(() => {
    const getUserCart = () => {
      const item = localStorage.getItem('number');
      if (item) {
        setNumber(parseInt(item));
      }
    };

    const getUserRole = () => {
      const userRole = localStorage.getItem('role'); // Assumes the role is stored in localStorage
      if (userRole) {
        setRoles([userRole]); // Assuming roles is an array
      }
    };

    getUserCart();
    getUserRole();

    window.addEventListener('storage', getUserCart);
    return () => {
      window.removeEventListener('storage', getUserCart);
    };
  }, [number]);

  // Redirige a la página de historial de compras
  const goToPurchaseHistory = () => {
    navigate('/purchase-history');
  };

  // Cierra la sesión del usuario
  const closeSession = () => {
    logout({ navigate });
  };

  return (
    <div className={headerStyles.header_container}>
      <a className={headerStyles.logo_container} href="/store">
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXe4D2gn5i4fnOOCTxOCxvnOsvdIZZCQV_6w&s' alt='logo' height={80} />
        <Typography variant="span" fontSize={40} color={'#e39968'} component="h2" marginLeft={1} fontWeight={600}>
          Harvest
        </Typography>
      </a>

      <div className={headerStyles.title_container}>
        <div>
          {/* Show button only if the user has one role (i.e., not an admin) */}
          {roles.length === 1 && (
            <Button variant="text" color="success" id="button">
              Añadir nuevo producto
            </Button>
          )}
        </div>
      </div>

      <nav className={headerStyles.actions}>
        {/* Only show the cart if the user is not an admin (roles length is 1 for regular users) */}
        {roles.length < 1 ? (
          <IconButton aria-label="cart" color="primary" href="/store/cart" size="large" style={{ color: '#1976d2' }}>
            <Badge badgeContent={number} color="primary">
              <ShoppingCartIcon style={{ fontSize: '45px' }} />
            </Badge>
          </IconButton>
        ) : null}

        {/* Botón de historial de compras */}
        <IconButton 
          aria-label="purchase-history" 
          color="primary" 
          size="large" 
          onClick={goToPurchaseHistory} 
          style={{ color: '#f39c12' }} // Amarillo
        >
          <HistoryIcon style={{ fontSize: '45px' }} />
        </IconButton>

        {/* Botón de logout */}
        <IconButton 
          aria-label="logout" 
          color="error" 
          size="large" 
          onClick={closeSession} 
          style={{ fontSize: '45px', color: '#e74c3c' }} // Rojo
        >
          <LogoutIcon style={{ fontSize: '45px' }} />
        </IconButton>
      </nav>
    </div>
  );
}

export default Header;
