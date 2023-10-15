import React, { useContext } from 'react'
import { Formik } from 'formik'
import axios from '../../axios/axios'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../App'
import { clearWaitingQueue } from '../../App'

import { loginInitialValues, loginValidationSchema } from './validation'

import { successNotification, errorNotification } from '../../utils/notifications'

const LoginForm = () => {
    const navigate = useNavigate()
    const {currentUser: user, setCurrentUser} = useContext(AuthContext)

    const handleSubmit = async (values) => {
        try {
            await axios.post('users/login/', values, {
                withCredentials: true,
            });
            setCurrentUser({ "logged_in": true });
            clearWaitingQueue();
            navigate('/');
            successNotification('Udało Ci się zalogować!');
        } catch (err) {
            console.log(err);
            errorNotification('Email/hasło jest niepoprawne');
            clearWaitingQueue();
        }
    };

  return (
    <>
    <div className='w-full flex flex-col justify-center items-center'>
        <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                <form 
                    onSubmit={handleSubmit} 
                    className='flex flex-col gap-3 w-full max-w-[350px]'
                >
                    <div className='flex flex-col'>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        name="email"
                        type="text"
                        autoComplete='username'
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        helpertext={touched.email && errors.email}
                        className='py-2 px-3 rounded-lg border-red-300'
                    />
                    {touched.email && Boolean(errors.email) && (
                        <p className='text-red-500'>{errors.email}</p>
                    )}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Hasło </label>
                        <input
                            id="password" 
                            name="password" 
                            type="password" 
                            autoComplete='current-password' 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={touched.password && Boolean(errors.password)}
                            helpertext={touched.password && errors.password}
                            className='py-2 px-3 rounded-lg'
                        />
                        {touched.password && Boolean(errors.password) && (
                        <p className='text-red-500'>{errors.password}</p>
                    )}
                    </div>
                    <div>
                        <button type="submit" className='w-full rounded-md text-center text-white  bg-slate-500 p-2'>
                        Zaloguj
                        </button>
                    </div>
                </form>
            )}
        </Formik>        
    </div>
    </>
  )
}


export default LoginForm