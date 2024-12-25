import { useState } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BiShow, BiHide} from 'react-icons/bi'
import './index.css'

const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPasswordStatus] = useState(false)
    const [showErrorMsg, setErrorMsgStatus] = useState(false)
    const [errorMsg, setErrMsg] = useState('')
    const {history} = props

    const onClickShowHidePassword = () => {
        setShowPasswordStatus(prevState => !prevState)
    }

    const onClickLogin = async e => {
        e.preventDefault()
        setErrorMsgStatus(false)
        setErrMsg('')

        const userDetails = {
            username, password
        }

        const API_URL = 'https://task-tracker-jv34.onrender.com/login'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        }

        if(username!=="" && password !==""){
            const response = await fetch(API_URL, options)
            const data = await response.json()

            if(response.ok === true){
                localStorage.setItem('username', data.username)
                localStorage.setItem('uid', data.userId)
                Cookies.set('jwt_token', data.jwtToken, {expires: 30, path:'/'})
                history.replace('/')
            }
            else{
                setErrorMsgStatus(true)
                setErrMsg(data.message)
            }
        }
    }

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
        console.log(jwtToken !== undefined)
        const {history} = props
        history.replace('/')
    }
    
    return(
        <div className='login-main-container'>
            <div className="login-container">
                <h1 className="login-heading"> Login </h1>
                <p className="login-message"> Login to access your account </p>

                <form className="username-password-container" onSubmit={onClickLogin}>
                    <div className="username-container">
                        <label htmlFor="username" className='username-password-label'> Username </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="username-password-input-box" id="username" placeholder='Enter Username' required/>
                    </div>

                    <div className="password-container">
                        <label htmlFor="password" className='username-password-label'> Password </label>
                        <div className='password-input-box'>
                            <input type={showPassword ? 'text': 'password'} onChange={(e) => setPassword(e.target.value)} value={password} className="password-box" id="password" placeholder='Enter Password' required/>
                            {
                                showPassword ? (
                                    <button type='button' className='show-hide-btn' onClick={onClickShowHidePassword}> <BiHide /> </button>
                                ):(
                                    <button type='button' className='show-hide-btn' onClick={onClickShowHidePassword}> <BiShow /> </button>
                                )
                            }
                        </div>
                    </div>

                    <div className='login-btn-container'>
                        <button type='submit' className='login-btn'> Login </button>
                    </div>

                    {showErrorMsg && <p className='error-message'> {errorMsg} </p>}

                    <p className='dont-have-an-account-text'> Don't have an account yet? <Link to="/signup" className="login-signup-link-item"> Sign up </Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Login