import { Formik } from 'formik';
import axios from 'axios';

import { clearWaitingQueue } from '../../App';
import { resetInitialValues, resetValidationSchema } from './validation';
import { errorNotification, successNotification } from '../../utils/notifications';


const ResetForm = () => {
    const handleSubmit = async (values, props) => {
        try{
            const res = await axios.post('http://127.0.0.1:8001/users/reset_password/', {...values}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
                
            })
            clearWaitingQueue();
            props.resetForm();
            successNotification('Sprawdź podany adres e-mail!');
        } catch(err) {
            errorNotification('Podany adres e-mail nie istnieje');
            clearWaitingQueue();
        }
    }
    
  return (
    <>
    <div className='w-full flex flex-col justify-center items-center'>
        <Formik
            initialValues={resetInitialValues}
            validationSchema={resetValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleBlur, handleChange, values, touched, errors }) => (
                <form 
                    onSubmit={handleSubmit} 
                    className='flex flex-col gap-3 w-full max-w-[350px]'
                >
                    <div className='flex flex-col'>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        autoComplete='username'
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        className='py-2 px-3 rounded-lg border-red-300'
                    />
                    {touched.email && Boolean(errors.email) && (
                        <p className='text-red-500'>{errors.email}</p>
                    )}
                    </div>
                   
                    <div>
                        <button type="submit" className='w-full rounded-md text-center text-white  bg-slate-500 p-2'>
                        Zresetuj hasło
                        </button>
                    </div>
                </form>
            )}
        </Formik>        
    </div>
    </>
  )
}


export default ResetForm