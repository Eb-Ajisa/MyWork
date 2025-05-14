const form = document.getElementById('form');
const username_input = document.getElementById('username-in');
const email_input = document.getElementById('email-in');
const password_input = document.getElementById('password-in');
const repeat_password_input = document.getElementById('repeat-password-in');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {

    let errors =[]

    if(username_input){
        errors= getSignupformerrors(username_input.value, email_input.value, password_input.value, repeat_password_input.value)
    }
    else{
        errors = getloginformerrors(email_input.value, password_input.value)
   }
    if(errors.length > 0){
        e.preventDefault()
        error_message.innerText  = errors.join(". ")

    }
 
})

function getSignupformerrors(username, email, password, repeatPassword){
    let errors = []

    if(username === '' || username == null){
    errors.push('Username is required')
    username_input.parentElement.classList.add('wrong');
    }

    if(email === '' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('wrong');
    }

    if(password === '' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('wrong');
    }

    if(repeatPassword === '' || repeatPassword == null){
        errors.push('Repeat Password is required')
        repeat_password_input.parentElement.classList.add('wrong');
    }
    if(password.length < 6){
        errors.push('Password must have at least 6 characters')
        password_input.parentElement.classList.add('wrong');
    }
    if(password !== repeatPassword){
        errors.push('Password does not match repeated password')
        password_input.parentElement.classList.add('wrong');
        repeat_password_input.parentElement.classList.add('wrong');
    }
    return errors;
}

function getloginformerrors(email, password){
    let errors = []

    if(email === '' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('wrong');
    }

    if(password === '' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('wrong');
    }
}

const allInputs = [username_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('wrong')){
            input.parentElement.classList.remove('wrong')
            error_message.innerText = ''
        }
    })
})

