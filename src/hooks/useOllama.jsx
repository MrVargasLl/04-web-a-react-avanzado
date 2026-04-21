import axios from 'axios'
import { useReducer, useState } from 'react'

export const useOllama = () => {
  const [loading, setLoading] = useState(false)

  const sendMessage = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'gemma2',
        prompt: userPrompt,
        stream: false,
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
