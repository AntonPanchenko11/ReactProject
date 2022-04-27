import React, { createContext, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
// src
import Header from "./components/molecules/Header"
import CategoriesPage from "./components/pages/CategoriesPage"
import CoursesPage from "./components/pages/CoursesPage"
import LessonsPage from "./components/pages/LessonsPage"
import CreateCategory from "./components/pages/CreateCategory"
import CreateLesson from "./components/pages/CreateLesson"
import CreateVideo from "./components/pages/CreateVideo"
import UpdateCategory from "./components/pages/UpdateCategory"
import UpdateLesson from "./components/pages/UpdateLesson"
import UpdateVideo from "./components/pages/UpdateVideo"
import Profile from "./components/pages/ProfilePage"
import { axiosClient } from "./services/api.service"
import SignUpPage from "./components/pages/SignUpPage"
import SignInPage from "./components/pages/SignInPage"
import HomePage from "./components/pages/HomePage"
import SignOutPage from "./components/pages/SignOutPage"
import VideosPage from "./components/pages/VideosPage";


export const AuthContext = createContext()

export default function App () {
  const [ user, setUser ] = useState(null)
  const [ buy, setBuy ] = useState([])

  const contextProps = {
    user,
    setUser,
    buy,
    setBuy
  }

  useEffect(() => {
    axiosClient.get('/users/sign_in')
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [])

  return (
    <AuthContext.Provider value={contextProps}>
      <SnackbarProvider>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/sign_up' element={<SignUpPage/>} />
          <Route path='/sign_in' element={<SignInPage/>} />
          <Route path='/sign_out' element={<SignOutPage/>} />
          <Route path='/categories' exact element={<CategoriesPage/>} />
          <Route path='/categories/:id/:name' exect element={<CoursesPage/>} />
          <Route path='/categories/:id/:name/:idLesson/:nameLesson' exect element={<LessonsPage/>} />
          <Route path='/categories/:id/:name/:idLesson/:nameLesson/:idVideos/:nameVideos' exect element={<VideosPage/>} />
          <Route path='/top' exact element={<HomePage/>} />

          {user && (
            <Route path='/profile' element={<Profile/>} />
          )}

          {user && user.role === 'admin' && (
            <>
              <Route path='/categories/new' exact element={<CreateCategory/>} />
              <Route path='/categories/:id/:name/new' exact element={<CreateLesson/>} />
              <Route path='/categories/:id/:name/:idLesson/:nameLesson/new' exact element={<CreateVideo/>} />
              <Route path='/categories/:id/:name/update' exact element={<UpdateCategory/>} />
              <Route path='/categories/:id/:name/:idLesson/:nameLesson/update' exact element={<UpdateLesson/>} />
              <Route path='/categories/:id/:name/:idLesson/:nameLesson/:idVideo/:nameVideo/update' exact element={<UpdateVideo/>} />
            </>
          )}
        </Routes>
      </SnackbarProvider>
    </AuthContext.Provider>
  )
}




