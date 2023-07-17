import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { UserContext } from './components/UserContext'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import WritePage from './components/WritePage'
import EditPage from './components/EditPage'
import LoginPage from './components/LoginPage'
import CreateUserPage from './components/CreateUserPage'

const App = () => {
    const [user, setUser] = useState({})

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <div>
                    <h2>Painting house</h2>
                    <NavBar />
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/write" element={<WritePage />} />
                        <Route exact path="/edit/:postId" element={<EditPage />} />
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route exact path="/create_user" element={<CreateUserPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App