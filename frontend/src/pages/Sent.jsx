import React from 'react'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdOutgoingMail } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { getUserSent, reset } from '../features/message/messageSlice'
import Spinner from '../components/Spinner'
import MessageItem from '../components/MessageItem'

function Sent() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { from, isLoading, isError, isSuccess, message }
        = useSelector((state) => state.message)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getUserSent())

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
                    <MdOutgoingMail /> Sent
                </h5>
            </section>
            {from.length > 0 ? (
                <>
                    {from.map((message) => (
                        <MessageItem key={message.id} message={message} tf='t' />
                    ))}
                </>
            ) : (
                <p>You Have No Messages</p>
            )}
        </>
    )

}

export default Sent