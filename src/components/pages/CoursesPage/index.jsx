import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router"
import Box from '@mui/material/Box'
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import CardActions from "@mui/material/CardActions"

// src
import CreateButton from "../../atoms/CreateButton"
import RedactButton from "../../atoms/RedectButton"
import { AuthContext } from "../../../App"
import { axiosClient } from "../../../services/api.service"
import Block from "../../molecules/Block";

export default function CoursesPage () {

  const { user } = useContext(AuthContext)
  const {id} = useParams()
  const navigate = useNavigate()
  const [items, setItems] = useState([])

  useEffect(() => {
    axiosClient.get(`/categories/${id}`)
      .then((response) => {
        console.log('response =>', response)
        setItems(response.data)
      })
      .catch((error) => {
        console.log('error =>', error)
      })
  }, [id])

  return (
    <Box mt={3} sx={{ minHeight: 500}}>
      <Stack m={3} spacing={2} direction="row">
        { user && user.role === 'admin' &&
          <>
            <CreateButton/>
            <RedactButton/>
          </>
        }
        <CardActions >
          <Button
            variant="outlined"
            onClick={() => navigate('/categories')}
          >
            Назад
          </Button>
        </CardActions>
      </Stack>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        { items.map((lesson) =>
          <Block
            key={lesson.id}
            valueId={lesson.id}
            valueName={lesson.name_lesson}
          />
        )}
      </Box>
    </Box>
  );
}
