import React, {useState, useContext} from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AuthContext, clearWaitingQueue } from '../../App'
import axiosInstance from '../../axios/axios'
import { validationSchema, loginInitialValues } from './validation'


const ChangePasswordForm = () => {
    const [errors, setErrors] = useState();
    const {currentUser:user, setCurrentUser} = useContext(AuthContext)
    const navigate = useNavigate()

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
    

    const handleSubmit = async ({values}) => {
        try{
            await axiosInstance.post('users/change-password/', {...values})
            setCurrentUser(true)
            clearWaitingQueue();
            successNotification();
        } catch (err){
            console.log(`${err.response.status}: ${err.response.statusText}`)
            setErrors(err)
            errorNotification();
            clearWaitingQueue();
        }
    }

  return (
    <>
    <div className='w-full flex flex-col justify-center items-center'>
        <Formik
            initialValues={loginInitialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {props => (
                <form 
                    onSubmit={props.handleSubmit} 
                    className='flex flex-col gap-4 w-full max-w-[350px]'
                >
                    <div className='flex flex-col'>
                        <label htmlFor="password">Stare Hasło </label>
                        <input
                            id="old_password" 
                            name="old_password" 
                            type="password" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.old_password}
                            error={props.touched.old_password && Boolean(props.errors.old_password)}
                            helpertext={props.touched.old_password && props.errors.old_password}
                            className='py-2 px-3 rounded-lg'
                        />
                        {props.touched.old_password && Boolean(props.errors.old_password) && (
                        <p className='text-red-500'>{props.errors.old_password}</p>
                    )}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="new_password">Nowe Hasło </label>
                        <input
                            id="new_password" 
                            name="new_password" 
                            type="password" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.new_password}
                            error={props.touched.new_password && Boolean(props.errors.new_password)}
                            helpertext={props.touched.new_password && props.errors.new_password}
                            className='py-2 px-3 rounded-lg'
                        />
                        {props.touched.new_password && Boolean(props.errors.new_password) && (
                        <p className='text-red-500'>{props.errors.new_password}</p>
                    )}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="confirm_new_password">Potwierdź Hasło </label>
                        <input
                            id="confirm_new_password" 
                            name="confirm_new_password" 
                            type="password" 
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.confirm_new_password}
                            error={props.touched.confirm_new_password && Boolean(props.errors.confirm_new_password)}
                            helpertext={props.touched.confirm_new_password && props.errors.confirm_new_password}
                            className='py-2 px-3 rounded-lg'
                        />
                        {props.touched.confirm_new_password && Boolean(props.errors.confirm_new_password) && (
                        <p className='text-red-500'>{props.errors.confirm_new_password}</p>
                    )}
                    </div>
                    <div>
                        <button type="submit" className='w-full rounded-md text-center bg-slate-500 p-2'>
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