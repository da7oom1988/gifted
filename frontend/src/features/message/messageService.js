import axios from 'axios'

const API_URL = '/api/messages/'

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

// get user inbox
const getUserInbox = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(API_URL + 'to', config)

    return response.data
}

// get user sent
const getUserSent = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(API_URL + 'from', config)

    return response.data
}

// create new message
const createMessage = async (messageData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL+ 'new', messageData, config)

    return response.data
}

// set read
const setRead = async (messageId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.put(API_URL+ 'read', {id: messageId}, config)

    return response.data
}

// get user sent
const getById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(`${API_URL}message/${id}`, config)

    return response.data
}

const authService = {
  getUserInbox,
  getUserSent,
  createMessage,
  getById,
  setRead
}

export default authService