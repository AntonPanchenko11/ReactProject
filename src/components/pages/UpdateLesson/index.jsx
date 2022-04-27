import React from "react"
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom"
import {
  Button,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from 'formik'
import { useSnackbar } from "notistack"

// src
import { axiosClient } from "../../../services/api.service"
import DeleteButton from "../../atoms/DeleteButton"



export default function UpdateLesson() {

  const {id, name, idLesson} = useParams()
  const { enqueueSnackbar } = useSnackbar()
  let navigate = useNavigate()

  const goBack = () => navigate(`/categories/${id}/${name}`)

  const onSubmit = () => {
    axiosClient.patch(`categories/${id}/lessons/${idLesson}`, {
      name_lesson: formik.values.nameLesson,
      lesson_id: formik.values.lessonId
    })
      .then((response) => {
        enqueueSnackbar(`Успешно отредактированно`, {
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
      lessonId: `${idLesson}`
    },
    onSubmit,
  })

  return (
    <div>
      <Typography variant="h2" component="h2">
        Редактирование Курса
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
          Редактировать
        </Button>
      </form>
      <DeleteButton url={`${id}/lessons/${idLesson}`}/>
    </div>
  );
}