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

export default function UpdateVideo() {

  const { id, name, idLesson, nameLesson, idVideo } = useParams()
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate()
  const goBack = () => navigate(`/categories/${id}/${name}/${idLesson}/${nameLesson}`)

  const onSubmit = (values) => {
    axiosClient.patch(`categories/${id}/lessons/${idLesson}/videos/${idVideo}`, {
      name_video: formik.values.nameVideo,
      video_id: formik.values.videoId
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
      nameVideo: '',
      videoId: `${idVideo}`
    },
    onSubmit,
  })

  return (
    <div>
      <Typography variant="h2" component="h2">
        Редактирование Урока
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
          Редактировать
        </Button>
      </form>
      <DeleteButton url={`${id}/lessons/${idLesson}/videos/${idVideo}`}/>
    </div>
  );
}