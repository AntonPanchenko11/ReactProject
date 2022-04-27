import React, { useContext } from "react";
import { useNavigate } from "react-router"
import {
  Button,
  TextField, Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import Stack from "@mui/material/Stack"

// src
import { axiosClient } from "../../../services/api.service"
import { AuthContext } from "../../../App"

export default function SignInPage() {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar();

  const goBack = () => navigate('/categories')

  const onSubmit = () => {
    axiosClient.post(`users/sign_in`, {
      user: {
        email: formik.values.email,
        password: formik.values.password
      }
    })
      .then((response) => {
        enqueueSnackbar(`Hi ${response.data.first_name}`, {
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
      email: '',
      password: ''
    },
    onSubmit,
  })

  return (
    <div>
      <Typography variant="h2" component="h2">
        Вход
      </Typography>

      <form onSubmit={ formik.handleSubmit }>

        <TextField
          margin='normal'
          id =    "email"
          name =  "email"
          label = "Ваш email"
          fullWidth
          value =      { formik.values.email }
          onChange =   { formik.handleChange }
          error =      { Boolean(formik.errors.email) && formik.touched.email }
          helperText = { formik.touched.email && formik.errors.email }
        />

        <TextField
          id =    "password"
          name =  "password"
          label = "Ваш пароль"
          fullWidth
          value =      { formik.values.password }
          onChange =   { formik.handleChange }
          error =      { Boolean(formik.errors.password) && formik.touched.password }
          helperText = { formik.touched.password && formik.errors.password }
        />
        <Stack m={2} spacing={2} direction="row">
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
            Войти
          </Button>
        </Stack>

      </form>

    </div>
  );
}