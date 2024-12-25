import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = props => {
    const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace("/login")
    }
    return (
        <nav className='nav-container'>
            <div>
                <h1 className='app-name'> Task Tracker </h1>
            </div>

            <button className='logout-btn' onClick={onClickLogout}>
                Logout
            </button>
        </nav>
    )
}

export default withRouter(Navbar)