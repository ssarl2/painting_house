import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import WritePage from './components/WritePage'
import EditPage from './components/EditPage'
import CreateUserPage from './components/CreateUserPage'

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <h2>Painting house</h2>
                <NavBar />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/write" element={<WritePage />} />
                    <Route exact path="/edit/:postId" element={<EditPage />} />
                    <Route exact path="/create_user" element={<CreateUserPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App