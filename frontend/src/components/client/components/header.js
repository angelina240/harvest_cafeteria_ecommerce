import { Typography, IconButton, Badge } from '@mui/material'
import React, { useEffect, useState } from 'react'
import headerStyles from './header.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth'
function Header() {
  let navigate = useNavigate()
  let [number, setNumber] = useState(0)
  useEffect(() => {
    let shouldUpdate = true
    const getUserCart = () => {
      const item = localStorage.getItem('number')
      if (item) {
        setNumber(parseInt(item))
      }
    }
    if (shouldUpdate) {
      getUserCart()
    }
    window.addEventListener('storage', getUserCart)
    return () => {
      shouldUpdate = false;
    }
  }, [number])
  const closeSession = () => {
    logout({ navigate })
  }
  return (
    <div className={headerStyles.header_container}>
      <a className={headerStyles.logo_container} href="/store">
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXe4D2gn5i4fnOOCTxOCxvnOsvdIZZCQV_6w&s' alt='logo' height={80} />
        <Typography variant="span" fontSize={40} color={'#e39968'} component="h2" marginLeft={1} fontWeight={600}>
          Harvest
        </Typography>
      </a>
      <nav className={headerStyles.actions}>
        <IconButton aria-label="delete" color='error' href='/store/cart' size="large">
          <Badge badgeContent={number} color="primary" >
            <ShoppingCartIcon color="primary" />
          </Badge>
        </IconButton>
        <IconButton aria-label="delete" color='error' size="large" onClick={closeSession}>
          <LogoutIcon />
        </IconButton>
      </nav>
    </div>
  )
}

export default Header