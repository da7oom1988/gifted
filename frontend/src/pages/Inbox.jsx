import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  BsMailbox2 } from 'react-icons/bs'
import {toast} from 'react-toastify'

import { getUserInbox, reset } from '../features/message/messageSlice'
import Spinner from '../components/Spinner'
import MessageItem from '../components/MessageItem'

function Inbox() {

    const dispatch = useDispatch()

    const { to, isLoading, isError, isSuccess, message }
        = useSelector((state) => state.message)

    useEffect(() => {
        if(isError){
            toast.error(message)
          }

        dispatch(getUserInbox())

        return () => {
            dispatch(reset())
          }

    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>        
        <section className='heading'>
        <h5>
          <BsMailbox2 /> Inbox
        </h5>
      </section>
      {to.length > 0 ? (
        <>
            {to.map((message) => (
                <MessageItem key={message.id} message={message} tf='f'/>
            ))}
        </>
      ) : (
        <p>You Have No Messages</p>
      )}
        </>
    )
}

export default Inbox