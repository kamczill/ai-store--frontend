import * as yup from 'yup'

// reset
export const resetValidationSchema = yup.object({
    email: yup
        .string('Wprowadź email')
        .email('Wprowadź poprawnie email')
        .required('Email jest wymagany'),
})

export const resetInitialValues = {
    email: '',
}


// login
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

// register
export const registerValidationSchema = yup.object({
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
    rulesCheckbox: yup
        .bool().oneOf([true], 'To pole musi być zaznaczone'),
})

export const registerInitialValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstName:'',
    lastName:'',
    rulesCheckbox: false,
}
