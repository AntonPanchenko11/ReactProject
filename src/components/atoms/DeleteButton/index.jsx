import * as React from "react"
import { useNavigate } from "react-router"
import {
  Button,
} from "@mui/material"
import { useFormik } from 'formik'

// src
import { axiosClient } from "../../../services/api.service"


export default function DeleteButton({url}) {

  let navigate = useNavigate()
  const goBack = () => navigate('/categories')

  const onSubmit = (values) => {
    axiosClient.delete(`categories/${url}`)
      .then((response) => {
        console.log('response =>', response)
        goBack()
      })
    console.log('values', values)
  }

  const formik = useFormik({
    initialValues: {
    },
    onSubmit,
  })

  return (
    <div>
      <form onSubmit={ formik.handleSubmit }>
        <Button
          variant="outlined"
          type="submit"
        >
          Удалить
        </Button>
      </form>
    </div>
  );
}