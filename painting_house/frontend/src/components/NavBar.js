import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from './UserContext'

const NavBar = () => {
    const { user } = useContext(UserContext)
    return (
        <nav>
            <table border='1'>
                <tbody>
                    <tr>
                        <td>
                            <Link to="/">Home</Link>
                        </td>
                        {Object.keys(user).length > 0 && (
                            <td>
                                <Link to="write">Write</Link>
                            </td>
                        )}
                        <td>
                            <Link to="login">Login</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </nav>
    )
}

export default NavBar