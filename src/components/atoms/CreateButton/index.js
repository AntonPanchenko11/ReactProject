import React from "react"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router"

export default function CreateButton() {
  const navigate = useNavigate()
  return(
    <CardActions>
      <Button
        variant="outlined"
        onClick={() => navigate('new')}
      >
        Создать
      </Button>
    </CardActions>
  )
}