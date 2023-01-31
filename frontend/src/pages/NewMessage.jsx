import React from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaPaperPlane } from 'react-icons/fa'


import messageService from '../features/message/messageService'
import Spinner from '../components/Spinner'

function NewMessage() {

    const [searchParams, setSearchParams] = useSearchParams()

    const [formData, setFormData] = useState({
        to: searchParams.get('to') || '',
        title: searchParams.get('title') || '',
        body: ''
    })
    const [isLoading, setIsLoading] = useState(false)


    const { to, title, body } = formData

    const navigate = useNavigate()


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        if (!to || !title || !body) {
            toast.error('Please complete all fields')
        } else {
            const messageData = {
                to,
                title,
                body
            }

            setIsLoading(true)
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const newMessage = await messageService.createMessage(messageData, user.token);
                setIsLoading(false)
                navigate('/messages/sent')
            } catch (error) {
                toast.error(error.response.data.message)
                setIsLoading(false)
            }
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h5>
                    <FaPaperPlane /> New Message
                </h5>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            id='to'
                            name='to'
                            value={to}
                            placeholder='To'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            id='title'
                            name='title'
                            value={title}
                            placeholder='Title'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <textarea name="body"
                            id="body"
                            cols="100"
                            rows="8"
                            value={body}
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

export default NewMessage