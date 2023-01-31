import React from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import messageService from '../features/message/messageService'

function MessageItem({ message, tf }) {

    const navigate = useNavigate()

    const onClickDiv = async () => {
        if (tf !== 't') {
            const user = await JSON.parse(localStorage.getItem('user'))
            await messageService.setRead(message.id, user.token)
        }
        navigate(`/messages/message/${message.id}`)
    }

    return (
        <div className="message-item click" onClick={onClickDiv}>
            <h4 className='seander'>{message.read || tf === 't' ? null : <FaStar />}
                {" "}{tf === 't' ? 'To: ' : 'From: '} {tf === 't' ? message.to : message.from}</h4>
            <h2>{message.message_title}</h2>
            <div className='date'>
                {new Date(message.createdAt).toLocaleString('en-US')}
            </div>
        </div>
    )
}

export default MessageItem