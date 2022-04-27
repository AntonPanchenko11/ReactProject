import React, { useContext } from "react"
import { useParams } from "react-router-dom"
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
import DeleteButton from "../../atoms/DeleteButton"
import { AuthContext } from "../../../App"

export default function UpdateCategory() {

  const { id } = useParams()
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()
  const goBack = () => navigate('/categories')

  const onSubmit = () => {
    axiosClient.patch(`categories/${id}`, {
      name_category: formik.values.nameCategory,
      category_id: formik.values.categoryId
    })
      .then((response) => {
        enqueueSnackbar(`Успешно отредактированно`, {
          variant: 'success',
        })
        setUser(response.data)
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
      nameCategory: '',
      categoryId: `${id}`
    },
    onSubmit,
  })

  return (
    <div>
      <Typography variant="h2" component="h2">
        Редактирование
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
          Редактировать
        </Button>
      </form>
      <DeleteButton url={`${id}`}/>
    </div>
  );
}