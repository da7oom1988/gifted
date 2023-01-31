import React, { useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { toast } from 'react-toastify'


import authService from '../features/auth/authService'

function Settings() {


    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
    })

    const { oldPassword, newPassword, newPassword2 } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        if (newPassword !== newPassword2) {
            toast.error('Passwords do not match')
        } else {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const event = await authService.changePassword({ oldPassword, newPassword }, user.token);
                console.log(event)
                toast.success(event.message)
                setFormData({
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: ''
                })
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    }


    return (
        <>
            <section className='heading'>
                <h5>
                    <AiFillSetting /> Settings
                </h5>
            </section>
            <hr />
            <br />
            <h3>Change Your Password</h3>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            id='oldPassword'
                            name='oldPassword'
                            value={oldPassword}
                            placeholder='Enter your Password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            id='newPassword'
                            name='newPassword'
                            value={newPassword}
                            placeholder='Enter New Password'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            id='newPassword2'
                            name='newPassword2'
                            value={newPassword2}
                            placeholder='Enter New Password again'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Settings