import React, {useContext, useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router"
import Box from '@mui/material/Box'
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

// src
import CreateButton from "../../atoms/CreateButton"
import RedactButton from "../../atoms/RedectButton"
import { AuthContext } from "../../../App"
import { axiosClient } from "../../../services/api.service"
import {Typography} from "@mui/material";

export default function VideosPage() {

  const { user } = useContext(AuthContext)
  const { id, name, idLesson, idVideos } = useParams()
  const navigate = useNavigate()
  const [ items, setItems ] = useState(null)

  useEffect(() => {
    axiosClient.get(`/categories/${id}/lessons/${idLesson}/videos/${idVideos}`)
      .then((response) => {
        console.log('response =>', response)
        setItems(response.data.name_video)
      })
      .catch((error) => {
        console.log('error =>', error)
      })
  }, [id, idLesson, idVideos])

  return(
    <Box mt={3} sx={{ minHeight: 500}}>
      <Stack m={3} spacing={2} direction="row">
        {user && user.role === 'admin' &&
          <>
            <CreateButton/>
            <RedactButton/>
          </>
        }
        <CardActions >
          <Button
            variant="outlined"
            onClick={() => navigate(`/categories/${id}/${name}`)}
          >
            назад
          </Button>
        </CardActions>
      </Stack>
      <Typography variant="h2" component="h2">
        {items}
      </Typography>
    </Box>
  );
}