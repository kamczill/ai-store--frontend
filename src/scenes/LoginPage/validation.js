import * as yup from 'yup'

export const loginValidationSchema = yup.object({
    email: yup
        .string('Wprowadź email')
        .email('Wprowadź poprawnie email')
        .required('Email jest wymagany'),
    password: yup
        .string('Wprowadź hasło')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .required('Hasło jest wymagane'),
})

export const loginInitialValues = {
    email: '',
    password: '',
}
