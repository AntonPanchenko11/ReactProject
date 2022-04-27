import React, { useContext } from "react"
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
import { AuthContext } from "../../../App"
import Stack from "@mui/material/Stack";

export default function SignUpPage() {

  let navigate = useNavigate()

  const { setUser } = useContext(AuthContext)
  const goBack = () => navigate('/categories')
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (values) => {
    axiosClient.post(`users`, {
      user: {
        first_name: formik.values.firstName,
        last_name: formik.values.lastName,
        email: formik.values.email,
        password: formik.values.password
      }
    })
      .then((response) => {
        enqueueSnackbar(`Здравствуй, ${response.data.first_name}`, {
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
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    onSubmit,
  })

  return (
    <div>
      <Typography variant="h2" component="h2">
        Регистрация
      </Typography>

      <form onSubmit={ formik.handleSubmit }>

        <TextField
          margin="dense"
          id =    "firstName"
          name =  "firstName"
          label = "Ваше имя"
          fullWidth
          value =      { formik.values.firstName }
          onChange =   { formik.handleChange }
          error =      { Boolean(formik.errors.firstName) && formik.touched.firstName }
          helperText = { formik.touched.firstName && formik.errors.firstName }
        />

        <TextField
          margin="dense"
          id =    "lastName"
          name =  "lastName"
          label = "Ваша фамилия"
          fullWidth
          value =      { formik.values.lastName }
          onChange =   { formik.handleChange }
          error =      { Boolean(formik.errors.lastName) && formik.touched.lastName }
          helperText = { formik.touched.lastName && formik.errors.lastName }
        />

        <TextField
          margin="dense"
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
          margin='dense'
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
            зарегестрироваться
          </Button>
        </Stack>
      </form>
    </div>
  );
}