import Typography from "@mui/material/Typography"
import React from "react"

export default function Heading ({style}){
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={style}
    >
      Библиотека
    </Typography>
  )
}
