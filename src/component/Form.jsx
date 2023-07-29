import { Field, Form as FormFormik, Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import ic_email from '/public/icon/person.png'
import ic_password from '/public/icon/lock.png'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API
const APP_ID = import.meta.env.VITE_CLIENT_ID
const APP_SECRET = import.meta.env.VITE_CLIENT_SECRE

const loginSchema = yup.object().shape({
  email: yup.string().email('Email is required').required('email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password length minimum is 6'),
})

export default function Form({setToken}) {
  const [errors, setErrors] = useState({})
  async function handleSubmit(values) {
    try {
      await loginSchema.validate(values, { abortEarly: false })
      setErrors({})
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/users/authenticate`,
        headers: {
          'CF-Access-Client-Id': '8853ca70ca342d5659242857edb234de.access',
          'CF-Access-Client-Secret':
            'eec6df88a2637183a3df2171f944a2b58eed7ed645eb368edb51437ee8cdd777',
        },
        data: values,
      }

      axios
        .request(config)
        .then((response) => {
          setToken(response.data.token)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (errors) {
      const errorMessages = {}
      errors.inner.forEach((error) => {
        errorMessages[error.path] = error.message
      })
      setErrors(errorMessages)
    }
  }
  return (
    <div className='rounded-3xl bg-white shadow-[0_2px_20px_0_rgba(0,0,0,0.2)] px-10 py-8'>
      <div className='py-4 mb-6'>
        <p className='text-[28px] text-[#5B5B56]'>Masuk</p>
      </div>
      <div>
        <p className='text-[#393934] text-xs mb-6 text-left'>
          Masukkan alamat email kata sandi yang telah anda daftarkan.
        </p>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <FormFormik>
            <div className='w-full rounded-full relative flex items-center border border-[##DAD9D0] py-[14px] px-5 gap-[10px]'>
              <img src={ic_email} alt='email' className='w-6 h-6' />
              <Field
                name='email'
                className='bg-transparent outline-none border-none text-[#5B5B56] w-full'
                placeholder='user@user.com'
              />
            </div>
            {errors.email && (
              <p className='relative text-left mt-4 text-xs text-[#FF0000]'>
                {errors.email}
              </p>
            )}
            <div className='w-full rounded-full relative flex items-center border border-[##DAD9D0] py-[14px] px-5 gap-[10px] mt-4'>
              <img src={ic_email} alt='email' className='w-6 h-6' />
              <Field
                name='password'
                className='bg-transparent outline-none border-none text-[#5B5B56] w-full'
                type='password'
              />
            </div>
            {errors.password && (
              <p className='relative text-left mt-4 text-xs text-[#FF0000]'>
                {errors.password}
              </p>
            )}
            <button
              className='mt-6 w-full py-4 bg-[#F06623] border border-[#F06623] text-[#F9F9F4] rounded-full font-semibold'
              type='submit'
            >
              Masuk Sekarang
            </button>
          </FormFormik>
        </Formik>
      </div>
    </div>
  )
}
