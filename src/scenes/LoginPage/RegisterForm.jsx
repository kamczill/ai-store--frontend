import React, {useState} from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import axios from '../../axios/axios'
import { clearWaitingQueue } from '../../App'

import { registerInitialValues, registerValidationSchema } from './validation'

import { errorNotification, successNotification } from '../../utils/notifications'

const RegisterForm = ({ handleSetLoginForm }) => {

    const handleSubmit = async (values) => {
        try{
            await axios.post('users/create/', {
                'email': values.email,
                'password': values.password,
                'first_name': values.firstName,
                'last_name': values.lastName
            })
            handleSetLoginForm('login');
            toast.dismiss();
            successNotification('Twoje konto zostało założone! Możesz się zalogować');
            clearWaitingQueue();
        } catch (err) {
            if(err?.response?.status === 400){
                toast.dismiss();
                errorNotification('Podany email już istnieje');
                clearWaitingQueue();
            } else{
                errorNotification('Coś poszło nie tak');
            }
        }
    }

  return (
    <>
    <div className='w-full flex flex-col justify-center items-center'>
        <Formik
            initialValues={registerInitialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleBlur, handleChange, values, touched, errors }) => (
                <form 
                    onSubmit={handleSubmit} 
                    className='flex flex-col gap-4 w-full max-w-[350px] font-ms'
                >
                    <div className='flex flex-col'>
                    <label htmlFor="firstNameInput">
                        Imie
                    </label>
                    <input
                        id="firstNameInput"
                        name="firstName"
                        type="text"
                        onBlur={handleBlur}
                        value={values.firstName}
                        onChange={handleChange}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helpertext={touched.firstName && errors.firstName}
                        className='py-2 px-3 rounded-lg border border-slate-300'
                    />
                     {touched.firstName && Boolean(errors.firstName) && (
                        <p className='text-red-500'>{errors.firstName}</p>
                    )}
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="lastNameInput">
                        Nazwisko
                    </label>
                    <input
                        id="lastNameInput"
                        name="lastName"
                        type="text"
                        onBlur={handleBlur}
                        value={values.lastName}
                        onChange={handleChange}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helpertext={touched.lastName && errors.lastName}
                        className='py-2 px-3 rounded-lg border border-slate-300'
                    />
                     {touched.lastName && Boolean(errors.lastName) && (
                        <p className='text-red-500'>{errors.lastName}</p>
                    )}
                    </div>
                    <div className='flex flex-col'>
                    <label htmlFor="emailInput">
                        Email
                    </label>
                    <input
                        id="emailInput"
                        name="email"
                        type="text"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        helpertext={touched.email && errors.email}
                        className='py-2 px-3 rounded-lg border border-slate-300'
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={touched.password && Boolean(errors.password)}
                            helpertext={touched.password && errors.password}
                            className='py-2 px-3 rounded-lg border border-slate-300'
                        />
                         {touched.password && Boolean(errors.password) && (
                        <p className='text-red-500'>{errors.password}</p>
                    )}
                    </div>
                    <div className='flex flex-col font-ms'>
                        <div className='flex justify-between'>
                        <label htmlFor="rulesCheckbox" className='max-w-[300px]'>*Akceptuję <a href='/regulamin' className='underline'> Regulamin</a> oraz <a href='/polityka-prywatnosci' className='underline'>Politykę Prywatności</a> </label>
                        <input
                            id="rulesCheckbox" 
                            name="rulesCheckbox" 
                            type="checkbox" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.rulesCheckbox}
                            error={touched.rulesCheckbox && Boolean(errors.rulesCheckbox)}
                            helpertext={touched.rulesCheckbox && errors.rulesCheckbox}
                            className='w-[20px] border border-slate-300'
                        />
                        </div>
                         {touched.rulesCheckbox && Boolean(errors.rulesCheckbox) && (
                        <p className='text-red-500'>{errors.rulesCheckbox}</p>
                    )}
                    </div>
                    <div>
                        <button type="submit" className='w-full rounded-md text-center text-white  bg-slate-500 p-2'>
                        Zarejestruj
                        </button>
                    </div>
                </form>
            )}
        </Formik>        
    </div>
    </>
  )
}


export default RegisterForm