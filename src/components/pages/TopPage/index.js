import React, { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// src
import CreateButton from "../../atoms/CreateButton"
import { axiosClient } from "../../../services/api.service"
import { AuthContext } from "../../../App"
import Block from "../../molecules/Block";
import RedactButton from "../../atoms/RedectButton";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";

export default function CategoriesPage() {

  const { user, buy, setBuy } = useContext(AuthContext)
  const [ items, setItems ] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axiosClient.get('/categories')
      .then((response) => {
        console.log('response =>', response)
        setItems(response.data)
        setBuy()
      })
      .catch((error) => {
        console.log('error =>', error)
      })
  }, [])

  return (
    <Box>
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
