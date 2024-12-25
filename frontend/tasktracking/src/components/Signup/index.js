import { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import {BiShow, BiHide} from 'react-icons/bi'
import './index.css'

const Signup = props => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPasswordStatus] = useState(false)
    const [checkBothPassword, setCheckBothPassword] = useState(false)
    const [showErrorMsg, setErrorMsgStatus] = useState(false)
    const [errorMsg, setErrMsg] = useState('')
    const {history} = props

    const onClickShowHidePassword = () => {
        setShowPasswordStatus(prevState => !prevState)
    }

    const onSubmitRegistrationForm = async e => {
        e.preventDefault()
        setErrorMsgStatus(false)
        setErrMsg('')

        let userDetails

        if(password !== confirmPassword){
            setCheckBothPassword(true)
        }
        else{
            setCheckBothPassword(false)

            if(email !== '' && username !== '' && password !== ''){
                userDetails = {
                    email: email,
                    username: username,
                    password: password
                }

                const url = 'https://task-tracker-jv34.onrender.com/register'

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userDetails),
                }

                const response = await fetch(url, options)
                const data = await response.json()
                if(response.ok === true){
                    alert(data.message)
                    history.replace('/login')
                }
                else{
                    setErrorMsgStatus(true)
                    setErrMsg(data.message)
                }

            }
        }

    }

    return(
        <div className="register-main-container">
            <div className='register-container'>
                <h1 className='sign-up-heading'> Sign Up </h1>
                <p className="create-account-message"> Create a new account </p>

                <form className='register-form' onSubmit={onSubmitRegistrationForm}>
                    <div className='email-container'>
                        <label className='email-username-password-label' htmlFor='email'> Email Address </label>
                        <input type="email" className='email-username-password-input' value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder='Enter your Email' required />
                    </div>

                    <div className='username-container'>
                        <label className='email-username-password-label' htmlFor='username'> Username </label>
                        <input type="text" className='email-username-password-input' value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder='Enter Username' required/>
                    </div>

                    <div className='password-container'>
                        <label className='email-username-password-label' htmlFor='password'> Password </label>
                        <div className='password-input-box'>
                            <input type={showPassword ? 'text': 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="password-box" id="password" placeholder='Enter Password' required/>
                            {
                                showPassword ? (
                                    <button type='button' className='show-hide-btn' onClick={onClickShowHidePassword}> <BiHide /> </button>
                                ):(
                                    <button type='button' className='show-hide-btn' onClick={onClickShowHidePassword}> <BiShow /> </button>
                                )
                            }
                        </div>
                    </div>

                    <div className='confirm-password-container'>
                        <label className='email-username-password-label' htmlFor='confirm-password'> Confirm Password </label>
                        <input type="password" className='email-username-password-input' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirm-password" placeholder='Re-Enter Password' required/>
                    </div>

                    {checkBothPassword && <p className="login-register-error-msg"> Passwords Doesn't Match </p>}

                    <div className='sign-up-btn-container'>
                        <button type='submit' className='sign-up-btn'> Sign Up </button>
                    </div>
                    {showErrorMsg && <p className='error-message'> {errorMsg} </p>}
                    <p className='already-have-an-account'> Already have an account? <Link to="/login" className="login-signup-link-item"> Login </Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Signup