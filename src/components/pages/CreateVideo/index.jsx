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

export default function CreateVideo() {

  const navigate = useNavigate()
  const {id, name, idLesson, nameLesson} = useParams()
  const { enqueueSnackbar } = useSnackbar();

  const goBack = () => navigate(`/categories/${id}/${name}/${idLesson}/${nameLesson}`)

  const onSubmit = (values) => {
    axiosClient.post(`categories/${id}/lessons/${idLesson}/videos`, {
      name_video: formik.values.nameVideo,
      lesson_id: formik.values.lessonId,
      category_id: formik.values.categoryId
    })
      .then((response) => {
        enqueueSnackbar('Урок создан', {
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
      nameVideo: '',
      lessonId: `${idLesson}`,
      categoryId: `${id}`
    },
    onSubmit,
  })

  return (
    <div>
      <Typography variant="h2" component="h2">
        Создание Урока
      </Typography>

      <form onSubmit={ formik.handleSubmit }>

        <TextField
          id =    "nameVideo"
          name =  "nameVideo"
          label = "Название Урока"
          fullWidth
          value =      { formik.values.nameVideo }
          onChange =   { formik.handleChange }
          error =      { Boolean(formik.errors.nameVideo) && formik.touched.nameVideo }
          helperText = { formik.touched.nameVideo && formik.errors.nameVideo }
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