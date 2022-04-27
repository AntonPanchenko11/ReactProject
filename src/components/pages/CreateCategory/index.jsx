import * as React from "react"
import { useNavigate } from "react-router"
import {
  Button,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from 'formik'
import { useSnackbar } from "notistack"

// src
import { axiosClient } from "../../../services/api.service"


export default function CreateCategory() {

  let navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const goBack = () => navigate('/categories')

  const onSubmit = () => {
    axiosClient.post(`categories`, {
      name_category: formik.values.nameCategory
    })
      .then((response) => {
        enqueueSnackbar('Категория создана', {
          variant: 'success',
        })
        goBack()
      })
      .catch((response) => {
        enqueueSnackbar(`ASHIBKA`, {
          variant: 'error',
        })
        console.log('response =>', response)
      })
  }

  const formik = useFormik({
    initialValues: {
      nameCategory: ''
    },
    onSubmit,
  })

  return (
    <div>
      <Typography variant="h2" component="h2">
        Создание Категории
      </Typography>

      <form onSubmit={ formik.handleSubmit }>

        <TextField
          id =    "nameCategory"
          name =  "nameCategory"
          label = "Название Категории"
          fullWidth
          value =      { formik.values.nameCategory }
          onChange =   { formik.handleChange }
          error =      { Boolean(formik.errors.nameCategory) && formik.touched.nameCategory }
          helperText = { formik.touched.nameCategory && formik.errors.nameCategory }
        />

        <Button
          variant="outlined"
          onClick={ goBack }
        >
          Назад
        </Button>

        <Button
          variant="outlined"
          type="submit"
        >
          Создать
        </Button>
      </form>
    </div>
  );
}