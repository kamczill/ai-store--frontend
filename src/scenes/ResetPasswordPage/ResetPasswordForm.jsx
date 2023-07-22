import React, {useState, useContext, useEffect} from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { clearWaitingQueue } from '../../App'

const validationSchema = yup.object({
    password: yup
        .string('Wprowadź hasło')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .required('Hasło jest wymagane'),
        password_confirm: yup
        .string('Wprowadź hasło')
        .oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać') 
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .required('Hasło jest wymagane'),
})

const loginInitialValues = {
    password: '',
    password_confirm: ''
}

const ResetPasswordForm = ({token}) => {
    const [errorsFromServer, setErrorsFromServer] = useState();
    const navigate = useNavigate()
    const user = useContext(AuthContext)

    const successNotification = () => {
        toast.success('Twoje hasło zostało zmienione! Możesz się zalogować', {
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
        toast.error('Coś poszło nie tak! Link jest niepoprawny lub wygasł', {
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
        await axios.post('http://127.0.0.1:8001/users/reset_password/confirm/', {
            token: token,
            password: values.password
        
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
            
        })
        .then(res => {
            props.resetForm();
            clearWaitingQueue();
            successNotification();
            navigate('/login');
        })
        .catch(err => {
            console.log(err)
            errorNotification();
            clearWaitingQueue();
        })
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
                    class='flex flex-col gap-3 w-full max-w-[350px]'
                >
                    <div class='flex flex-col'>
                        <label htmlFor="password">Nowe hasło </label>
                        <input
                            id="password" 
                            name="password" 
                            type="password" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                            error={props.touched.password && Boolean(props.errors.password)}
                            helperText={props.touched.password && props.errors.password}
                            class='py-2 px-3 rounded-lg'
                        />
                        {props.touched.password && Boolean(props.errors.password) && (
                        <p class='text-red-500'>{props.errors.password}</p>
                    )}
                    </div>
                    <div class='flex flex-col'>
                        <label htmlFor="password_confirm">Potwierdź hasło </label>
                        <input
                            id="password_confirm" 
                            name="password_confirm" 
                            type="password" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password_confirm}
                            error={props.touched.password_confirm && Boolean(props.errors.password_confirm)}
                            helperText={props.touched.password_confirm && props.errors.password_confirm}
                            class='py-2 px-3 rounded-lg'
                        />
                        {props.touched.password_confirm && Boolean(props.errors.password_confirm) && (
                        <p class='text-red-500'>{props.errors.password_confirm}</p>
                    )}
                    </div>
                    <div>
                        <button type="submit" class='w-full rounded-md text-center text-white  bg-slate-500 p-2'>
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