import React, { useState } from 'react'
import { useEffect } from 'react'
import { getUser } from '../services/userService'

export const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser().then(data => setUser(data))
  }, [])

  return { user } // caracteristica tipica de CustomHooks
}
