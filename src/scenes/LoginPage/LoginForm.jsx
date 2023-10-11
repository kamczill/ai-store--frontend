import React, {useState, useContext, useEffect} from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { clearWaitingQueue } from '../../App'

const validationSchema = yup.object({
    email: yup
        .string('Wprowadź email')
        .email('Wprowadź poprawnie email')
        .required('Email jest wymagany'),
    password: yup
        .string('Wprowadź hasło')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .required('Hasło jest wymagane'),
})

const loginInitialValues = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const [errorsFromServer, setErrorsFromServer] = useState();
    const navigate = useNavigate()
    const user = useContext(AuthContext)

    const successNotification = () => {
        toast.success('Udało Ci się zalogować!', {
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
        toast.error('Email/hasło jest niepoprawne', {
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
        await axios.post('https://be.aiszef.pl/users/login/', {...values}, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {
            console.log(res);
            user.logged_in = 'true'
            window.location.reload(false);
            clearWaitingQueue();
            navigate('/');
            successNotification();
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

    useEffect(() => {
        if(user.logged_in === 'true'){
            navigate('/')
        }
    }, [])

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
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        name="email"
                        type="text"
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        onChange={props.handleChange}
                        error={props.touched.email && Boolean(props.errors.email)}
                        helperText={props.touched.email && props.errors.email}
                        class='py-2 px-3 rounded-lg border-red-300'
                    />
                    {props.touched.email && Boolean(props.errors.email) && (
                        <p class='text-red-500'>{props.errors.email}</p>
                    )}
                    </div>
                    <div class='flex flex-col'>
                        <label htmlFor="password">Hasło </label>
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
                    <div>
                        <button type="submit" class='w-full rounded-md text-center text-white  bg-slate-500 p-2'>
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