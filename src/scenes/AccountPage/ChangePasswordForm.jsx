import React, {useState, useContext, useEffect} from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { clearWaitingQueue } from '../../App'
import axiosInstance from '../../axios/axios'

const validationSchema = yup.object({
    old_password: yup
        .string('Wprowadź stare hasło')
        .required('Hasło jest wymagane'),
    new_password: yup
        .string('Wprowadź nowe hasło')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .required('Hasło jest wymagane'),
    confirm_new_password: yup
        .string('Potwierdź nowe hasło')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .required('Hasło jest wymagane'),
})

const loginInitialValues = {
    old_password: '',
    new_password: '',
    confirm_new_password: '',

}

const ChangePasswordForm = () => {
    const [errorsFromServer, setErrorsFromServer] = useState();
    const navigate = useNavigate()
    const user = useContext(AuthContext)

    const successNotification = () => {
        toast.success('Twoje hasło zostało zmienione!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    
    const errorNotification = () => {
        toast.error('Jedno z haseł jest niepoprawne!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    

    const handleSubmit = async ({values, props}) => {
        await axiosInstance.post('users/change-password/', {...values}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
            
        })
        .then(res => {
            console.log(res);
            user.logged_in = 'true'
            clearWaitingQueue();
            successNotification();
        })
        .catch(err => {
            console.log(err)
            errorNotification();
            clearWaitingQueue();
        })
        await axios('http://127.0.0.1:8001/users/1/', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
            
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    
    const showErrors = (errors) => {
        return(
        Object.entries(errors)?.map( err => (
            <p key={err[0]} color='red' fontFamily='Inter'>
                <p variant='span' fontWeight={600}>{err[0]}: </p>{err[1]}
            </p>
            ))
        )
    }

  return (
    <>
    <div class='w-full flex flex-col justify-center items-center'>
        <Formik
            initialValues={loginInitialValues}
            validationSchema={validationSchema}
            onSubmit={(values, props) => handleSubmit({values, props})}
        >
            {props => (
                <form 
                    onSubmit={props.handleSubmit} 
                    class='flex flex-col gap-4 w-full max-w-[350px]'
                >
                    <div class='flex flex-col'>
                        <label htmlFor="password">Stare Hasło </label>
                        <input
                            id="old_password" 
                            name="old_password" 
                            type="password" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.old_password}
                            error={props.touched.old_password && Boolean(props.errors.old_password)}
                            helperText={props.touched.old_password && props.errors.old_password}
                            class='py-2 px-3 rounded-lg'
                        />
                        {props.touched.old_password && Boolean(props.errors.old_password) && (
                        <p class='text-red-500'>{props.errors.old_password}</p>
                    )}
                    </div>
                    <div class='flex flex-col'>
                        <label htmlFor="new_password">Nowe Hasło </label>
                        <input
                            id="new_password" 
                            name="new_password" 
                            type="password" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.new_password}
                            error={props.touched.new_password && Boolean(props.errors.new_password)}
                            helperText={props.touched.new_password && props.errors.new_password}
                            class='py-2 px-3 rounded-lg'
                        />
                        {props.touched.new_password && Boolean(props.errors.new_password) && (
                        <p class='text-red-500'>{props.errors.new_password}</p>
                    )}
                    </div>
                    <div class='flex flex-col'>
                        <label htmlFor="confirm_new_password">Potwierdź Hasło </label>
                        <input
                            id="confirm_new_password" 
                            name="confirm_new_password" 
                            type="password" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.confirm_new_password}
                            error={props.touched.confirm_new_password && Boolean(props.errors.confirm_new_password)}
                            helperText={props.touched.confirm_new_password && props.errors.confirm_new_password}
                            class='py-2 px-3 rounded-lg'
                        />
                        {props.touched.confirm_new_password && Boolean(props.errors.confirm_new_password) && (
                        <p class='text-red-500'>{props.errors.confirm_new_password}</p>
                    )}
                    </div>
                    <div>
                        <button type="submit" class='w-full rounded-md text-center bg-slate-500 p-2'>
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


export default ChangePasswordForm