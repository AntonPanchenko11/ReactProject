import React, { useContext }  from "react"
import { useNavigate } from "react-router"
import {
  Button,
  Typography
} from "@mui/material"

// src
import {AuthContext} from "../../../App"


export default function Profile() {

  const { user } = useContext(AuthContext)

  let navigate = useNavigate()

  const goBack = () => navigate('/categories')

  return (
    <div>
      <Typography variant="h3" component="h2">
        {user.first_name}<br/>
        {user.last_name}<br/>
        {user.email}<br/>
      </Typography>

      <Button
        variant="outlined"
        onClick={ goBack }
      >
        Назад
      </Button>
    </div>
  );
}