import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaMailBulk, FaPaperPlane } from 'react-icons/fa'
import {  BsMailbox2 } from 'react-icons/bs'
import {  MdOutgoingMail } from 'react-icons/md'

function Messages() {
  return (
    <>
      <section className='heading'>
        <h1>
          <FaMailBulk /> Messageing Service
        </h1>
      </section>
      <div className="message-nav">
        <ul>
          <li>
            <Link to='/messages/inbox'>
              <BsMailbox2 /> Inbox
            </Link>
          </li>
          <li>
            <Link to='/messages/sent'>
              <MdOutgoingMail /> Sent
            </Link>
          </li>
          <li>
            <Link to='/messages/new'>
            <FaPaperPlane /> New Message
            </Link>
          </li>
        </ul >
      </div>
      <hr />
      <br />
      <Outlet />
    </>
  )
}

export default Messages