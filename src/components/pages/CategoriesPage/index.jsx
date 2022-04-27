import React, { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
// src
import CreateButton from "../../atoms/CreateButton"
import { axiosClient } from "../../../services/api.service"
import { AuthContext } from "../../../App"
import Block from "../../molecules/Block";

export default function CategoriesPage() {

  const { user } = useContext(AuthContext)
  const [ items, setItems ] = useState([])

  useEffect(() => {
    axiosClient.get('/categories')
      .then((response) => {
        console.log('response =>', response)
        setItems(response.data)
      })
      .catch((error) => {
        console.log('error =>', error)
      })
  }, [])

  return (
    <Box mt={3} sx={{ minHeight: 500 }}>
      { user && user.role === 'admin' &&
        <Stack m={3} spacing={2} direction="row">
          <CreateButton/>
        </Stack>
      }
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        { items.map((category) =>
          <Block
            key={category.id}
            valueId={category.id}
            valueName={category.name_category}
          />
        )}
      </Box>
    </Box>
  );
}
