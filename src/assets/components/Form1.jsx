import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  fullName: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  age: yup
    .number()
    .typeError('La edad debe ser un número')
    .positive('La edad debe ser número positivo')
    .integer('La edad debe ser número entero')
    .required('La edad es obligatoria'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña')

})

export const Form = () => {  const {    register,    handleSubmit,    
    formState: { errors, isValid }  } = useForm({  
          resolver: yupResolver(schema),    mode: 'onChange'  }) 
 const onSubmit = (data) => {    console.log(data)  }}


return (
<>
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Registro de usuario
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <input
          type="text"
          placeholder="Nombre completo"
          {...register('fullName')}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {errors.fullName && (
          <p className="text-red-500 text-sm">
            {errors.fullName.message}
          </p>
        )}

      </form>
    </div>
  </div>
</>
)
