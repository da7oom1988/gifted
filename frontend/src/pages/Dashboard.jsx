import React from 'react'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {getUserInbox , getUserSent} from '../features/message/messageSlice'

function Dashboard() {

  // const dispatch = useDispatch()


  // useEffect(()=> {
  //   dispatch(getUserInbox())
  //   dispatch(getUserSent())
  // }, [dispatch])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard