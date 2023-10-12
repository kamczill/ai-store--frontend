import * as yup from 'yup'

export const validationSchema = yup.object({
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

export const loginInitialValues = {
    old_password: '',
    new_password: '',
    confirm_new_password: '',
}