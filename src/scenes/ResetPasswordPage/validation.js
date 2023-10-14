import * as yup from 'yup'

export const validationSchema = yup.object({
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

export const initialValues = {
    password: '',
    password_confirm: ''
}