import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import React from "react"
import { useNavigate } from "react-router"

export default function RedactButton() {
  const navigate = useNavigate()
  return(
    <CardActions >
      <Button variant="outlined"
              onClick={() => navigate('update')}>
        редактировать
      </Button>
    </CardActions>
  )
}