import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEnvelopeOpenText } from 'react-icons/fa'


import messageService from '../features/message/messageService'
import Spinner from '../components/Spinner'


function Message() {

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})
    const [userName, setUserName] = useState('')

    const navigate = useNavigate()

    const getData = async (id) => {
        setIsLoading(true)
        try {
            const user = await JSON.parse(localStorage.getItem('user'))
            const message = await messageService.getById(id, user.token)
            setUserName(user.userName)
            setData(message)
            setIsLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getData(id)
    }, [])

    const replay = () => {
        navigate(`/messages/new?to=${data.from}&title=replay on: ${data.message_title}`)
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h5>
                    <FaEnvelopeOpenText /> {data.message_title}
                </h5>
                <p className='msg-info'>From: {data.from}</p>
                <p className='msg-info'>To: {data.to}</p>
            </section>
            <hr />
            <br />
            {data.to === userName ? (
                <button
                    className="btn"
                    onClick={replay}
                >Replay</button>
            ) : null}
            <section>
                <p className="msg-body">{data.message_body}</p>
            </section>
        </>
    )
}

export default Message