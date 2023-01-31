import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'

import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    password2: '',
    birthday: '',
    about: '',
  })

  const { name, userName, email, password, password2, birthday, about } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} =
   useSelector((state) => state.auth) 


  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())
  }, [user, isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => { 
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value
    }))
   }

  const onSubmit = (e) => { 
    e.preventDefault()

    if(password !== password2){
      toast.error('Passwords do not match')
    }else{
      if(!birthday){
        toast.error('Please provide a Birthday')
      }else{
        const userData = {
          name, 
          userName,
          email,
          password,
          birthday,
          about
        }
  
        dispatch(register(userData))
      }
    }
   }

   if(isLoading){
    return <Spinner />
   }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text"
              className="form-control"
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="text"
              className="form-control"
              id='userName'
              name='userName'
              value={userName}
              placeholder='Enter your User Name'
              onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="email"
              className="form-control"
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password"
              className="form-control"
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password"
              className="form-control"
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="date"
              className="form-control"
              id='birthday'
              name='birthday'
              value={birthday}
              placeholder='birthday'
              onChange={onChange} />
          </div>
          <div className="form-group">
           <textarea name="about" 
           id="about" 
           cols="100" 
           rows="8"
           value={about}
           onChange={onChange}></textarea>
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register