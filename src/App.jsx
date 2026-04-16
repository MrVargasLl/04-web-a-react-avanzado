import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener mínimo 3 caracteres')
    .required('El mensaje es obligatorio')
})

export const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const handlePregunta = (data) => {
    console.log(data)
  }

  return (
    <>
      <h1>ChatBot</h1>
      <form onSubmit={handleSubmit(handlePregunta)}>
        <input
          type='text'
          {...register('userInput')}
          className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        {errors.userInput && (
          <p className='text-red-500 text-sm'>
            {errors.userInput.message}
          </p>
        )}
        <button className='w-full py-2 rounded transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700'>Preguntar</button>
      </form>
    </>
  )
}
