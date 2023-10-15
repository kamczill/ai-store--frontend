import React from 'react'
import { Formik } from 'formik'
import axios from '../../axios/axios'
import { useNavigate } from 'react-router-dom'
import { clearWaitingQueue } from '../../App'
import { initialValues, validationSchema } from './validation'
import { successNotification, errorNotification } from '../../utils/notifications'

const ResetPasswordForm = ({token}) => {
    const navigate = useNavigate()

    const handleSubmit = async (values, props) => {
        try {
          await axios.post('users/reset_password/confirm/', {
            token,
            password: values.password,
          });
          props.resetForm();
          clearWaitingQueue();
          successNotification('Twoje hasło zostało zmienione! Możesz się zalogować');
          navigate('/login');
        } catch (err) {
          errorNotification('Coś poszło nie tak! Link jest niepoprawny lub wygasł');
          clearWaitingQueue();
        }
    };
    
  return (
    <>
    <div className='w-full flex flex-col justify-center items-center'>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                <form 
                    onSubmit={handleSubmit} 
                    className='flex flex-col gap-3 w-full max-w-[350px]'
                >
                    <div className='flex flex-col'>
                        <label htmlFor="password">Nowe hasło </label>
                        <input
                            id="password" 
                            name="password" 
                            type="password" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            className='py-2 px-3 rounded-lg'
                        />
                        {touched.password && Boolean(errors.password) && (
                        <p className='text-red-500'>{errors.password}</p>
                    )}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password_confirm">Potwierdź hasło </label>
                        <input
                            id="password_confirm" 
                            name="password_confirm" 
                            type="password" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password_confirm}
                            error={touched.password_confirm && Boolean(errors.password_confirm)}
                            helperText={touched.password_confirm && errors.password_confirm}
                            className='py-2 px-3 rounded-lg'
                        />
                        {touched.password_confirm && Boolean(errors.password_confirm) && (
                        <p className='text-red-500'>{errors.password_confirm}</p>
                    )}
                    </div>
                    <div>
                        <button type="submit" className='w-full rounded-md text-center text-white  bg-slate-500 p-2'>
                        Zmień hasło
                        </button>
                    </div>
                </form>
            )}
        </Formik>        
    </div>
    </>
  )
}


export default ResetPasswordForm