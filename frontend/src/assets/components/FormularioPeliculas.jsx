import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const FormularioPeliculas = () => {
  const { register, handleSubmit, reset } = useForm()
  const [peliculas, setPeliculas] = useState([])

  const obtenerPeliculas = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/peliculas')
      const data = await res.json()

      const todas = [...data.accion, ...data.drama]
      setPeliculas(todas)
      console.log(todas)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    obtenerPeliculas()
  }, [])

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/peliculas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      console.log(result)
      reset()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type='text'
          placeholder='Título'
          {...register('titulo', { required: true })}
        />

        <input
          type='text'
          placeholder='Director'
          {...register('director', { required: true })}
        />

        <input
          type='text'
          placeholder='Año'
          {...register('year', { required: true })}
        />

        <input
          type='text'
          placeholder='País'
          {...register('pais', { required: true })}
        />

        <select {...register('genero', { required: true })}>
          <option value=''>Selecciona el género</option>
          <option value='accion'>Acción</option>
          <option value='drama'>Drama</option>
        </select>

        <button type='submit'>Guardar película</button>
      </form>

      <h1>Mis Películas</h1>
      {peliculas.length === 0
        ? (
          <p>No hay películas</p>
          )
        : (
          <ul>
            {peliculas.map((peli, index) => (
              <li key={index}>
                <strong>{peli.titulo} </strong> ({peli.year}) - {peli.pais}
              </li>
            ))}
          </ul>
          )}
      <div>
        <p>Mis películas</p>
      </div>
    </>
  )
}
