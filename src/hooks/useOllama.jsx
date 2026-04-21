import axios from 'axios'
import { useReducer, useState } from 'react'

const initialState = {
  messages: []
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('Agregando mensaje...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] }
    default:
      return state
  }
}

export const useOllama = () => {
  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const sendMessage = async (userPrompt) => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { from: 'user', text: userPrompt },
    })

    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'gemma2',
        prompt: userPrompt,
        stream: false,
      })

      dispatch({
        type: 'ADD_MESSAGE',
        payload: { from: 'bot', text: res.data.response },
      })
      return res
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}
