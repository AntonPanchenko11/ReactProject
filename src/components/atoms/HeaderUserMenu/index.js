import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router"

export default function HeaderUserMenu ({settings, anchorElUser, handleOpenUserMenu,
                                          handleCloseUserMenu}){
  const navigate = useNavigate()

  return(
    <Box sx={{flexGrow: 0}}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          <Avatar alt="Remy Sharp" src=""/>
        </IconButton>
      </Tooltip>

      <Menu
        sx={{mt: '45px'}}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.landing} onClick={() => {
            navigate(setting.address)
            handleCloseUserMenu()
          }}>
            <Typography textAlign="center">
              {setting.landing}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}