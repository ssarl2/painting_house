import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <table border='1'>
                <tbody>
                    <tr>
                        <td>
                            <Link to="/">Home</Link>
                        </td>
                        <td>
                            <Link to="write">Write</Link>
                        </td>
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