import * as React from "react"
import { useNavigate } from "react-router"
import {
  Button,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from 'formik'
import { useParams } from "react-router-dom"
import { useSnackbar } from "notistack"

// src
import { axiosClient } from "../../../services/api.service";

export default function CreateLesson() {

  const navigate = useNavigate()
  const { id, name } = useParams()
  const { enqueueSnackbar } = useSnackbar();

  const goBack = () => navigate(`/categories/${id}/${name}`)

  const onSubmit = () => {
    axiosClient.post(`categories/${id}/lessons`, {
      name_lesson: formik.values.nameLesson,
      category_id: formik.values.categoryId
    })
      .then((response) => {
        enqueueSnackbar('Курс создан', {
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
      nameLesson: '',
      categoryId: `${id}`
    },
    onSubmit,
  })

  return (
    <div>
      <Typography variant="h2" component="h2">
        Создание Курса
      </Typography>

      <form onSubmit={ formik.handleSubmit }>

        <TextField
          id =    "nameLesson"
          name =  "nameLesson"
          label = "Название Курса"
          fullWidth
          value =      { formik.values.nameLesson }
          onChange =   { formik.handleChange }
          error =      { Boolean(formik.errors.nameLesson) && formik.touched.nameLesson }
          helperText = { formik.touched.nameLesson && formik.errors.nameLesson }
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