export const SubmitValidate = (email, password)  => {
    return email.length > 0 && password.length > 0
}


export const JoinValidate = (name) => {
    return name.length > 0
}

export const MessageValidate = (message) => {
    return message.length > 0
}