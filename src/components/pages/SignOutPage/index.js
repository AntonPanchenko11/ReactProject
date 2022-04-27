import React,{ useContext }  from "react"
import { useNavigate } from "react-router"
import {
  Button,
  Typography
} from "@mui/material"
import { useFormik } from 'formik'
import { useSnackbar } from "notistack"

// src
import { axiosClient } from "../../../services/api.service"
import { AuthContext } from "../../../App"

export default function SignOutPage() {

  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar();

  const goBack = () => navigate('/categories')

  const onSubmit = () => {
    axiosClient.delete(`/users/sign_out`)
      .then((response) => {
        enqueueSnackbar(`Пока, ${response.data.first_name}`, {
          variant: 'success',
        })
        setUser(null)
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
    initialValues: {},
    onSubmit,
  })

  return (
    <div>
      <Typography variant="h3" component="h2">
        Вы хотите выйти из профиля ?
      </Typography>

      <form onSubmit={ formik.handleSubmit }>
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
          Выйти из системы
        </Button>
      </form>
    </div>
  );
}