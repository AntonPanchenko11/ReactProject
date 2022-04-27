import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router"
import {
  AppBar,
  Box,
  Toolbar,
} from '@mui/material'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

//src
import { AuthContext } from "../../../App"
import HeaderMenu from "../../atoms/HeaderMenu"
import Heading from "../../atoms/Heading"
import HeaderUserMenu from "../../atoms/HeaderUserMenu"

const pages = [
  {
    landing: 'Главная',
    address: '/'
  },
  {
    landing: 'Категории',
    address: '/categories'
  }];

const settingsNoAuthorized = [
  {
    landing: 'Войти',
    address: '/sign_in'
  },
  {
    landing: 'Регистрация',
    address: '/sign_up'
  }];

const settingsAuthorized = [
  {
    landing: 'Профиль',
    address: '/profile'
  },
  {
    landing: 'Выйти из системы',
    address: '/sign_out'
  }];

export default function Header () {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  let settings = user
    ? settingsAuthorized
    : settingsNoAuthorized

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Heading style={{mr: 2, display: {xs: 'none', md: 'flex'}}}/>
          <HeaderMenu
            pages={pages}
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
          />
          <Heading style={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}/>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page.landing}
                sx={{my: 2, color: 'white', display: 'block'}}
                onClick={() => {
                  handleCloseNavMenu()
                  navigate(page.address)
                }}
              >
                {page.landing}
              </Button>
            ))}
          </Box>
          <HeaderUserMenu
            settings={settings}
            anchorElUser={anchorElUser}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
