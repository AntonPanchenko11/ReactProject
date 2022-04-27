import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router"

export default function HeaderMenu({pages, anchorElNav,
                                     handleOpenNavMenu,
                                     handleCloseNavMenu}) {
  const navigate = useNavigate()
  return(
    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: {xs: 'block', md: 'none'},
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page.landing}
                    onClick={() => {
                      navigate(page.address)
                      handleCloseNavMenu()
                    }}>
            <Typography textAlign="center">
              {page.landing}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}