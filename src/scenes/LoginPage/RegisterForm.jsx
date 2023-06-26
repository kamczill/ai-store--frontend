import React, {useState} from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import { clearWaitingQueue } from '../../App'

const validationSchema = yup.object({
    firstName: yup
        .string('Wprowadź imie')
        .required('Imię jest wymagane')
        .min(3, 'Co najmniej 3 litery'),
    lastName: yup
        .string('Wprowadź nazwisko')
        .required('Nazwisko jest wymagane')
        .min(3, 'Co najmniej 3 litery'),
    email: yup
        .string('Wprowadź email')
        .email('Wprowadź poprawnie email')
        .required('Email jest wymagany'),
    password: yup
        .string('Wprowadź hasło')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .required('Hasło jest wymagane'),
    passwordConfirm: yup
        .string('Potwierdź hasło')
        .oneOf([yup.ref('password'), null], 'Hasła muszą być takie same'),
})

const loginInitialValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstName:'',
    lastName:''
}

const RegisterForm = ({ handleSetLoginForm }) => {
    const [errorsFromServer, setErrorsFromServer] = useState();

    const successNotification = () => {
        toast.success('Twoje konto zostało założone! Możesz się zalogować', {
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
        toast.error('Podany email już istnieje', {
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
        await axios.post('http://127.0.0.1:8001/users/create/', {
            'email': values.email,
            'password': values.password,
            'first_name': values.firstName,
            'last_name': values.lastName
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
            
        })
        .then(res => {
            handleSetLoginForm(true);
            toast.dismiss();
            successNotification();
            clearWaitingQueue();
        })
        .catch(err => {
            if(err?.response?.status === 400){
                toast.dismiss();
                errorNotification();
                clearWaitingQueue();
            } else{
                console.log(err)
            }
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
                    <label htmlFor="firstName">
                        Imie
                    </label>
                    <input
                        name="firstName"
                        type="text"
                        onBlur={props.handleBlur}
                        value={props.values.firstName}
                        onChange={props.handleChange}
                        error={props.touched.firstName && Boolean(props.errors.firstName)}
                        helperText={props.touched.firstName && props.errors.firstName}
                        class='py-2 px-3 rounded-lg border-red-300'
                    />
                     {props.touched.firstName && Boolean(props.errors.firstName) && (
                        <p class='text-red-500'>{props.errors.firstName}</p>
                    )}
                    </div>
                    <div class='flex flex-col'>
                    <label htmlFor="lastName">
                        Nazwisko
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        onBlur={props.handleBlur}
                        value={props.values.lastName}
                        onChange={props.handleChange}
                        error={props.touched.lastName && Boolean(props.errors.lastName)}
                        helperText={props.touched.lastName && props.errors.lastName}
                        class='py-2 px-3 rounded-lg border-red-300'
                    />
                     {props.touched.lastName && Boolean(props.errors.lastName) && (
                        <p class='text-red-500'>{props.errors.lastName}</p>
                    )}
                    </div>
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
                        <button type="submit" class='w-full rounded-md text-center bg-slate-500 p-2'>
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