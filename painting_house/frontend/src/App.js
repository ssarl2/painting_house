import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import WritePage from './components/WritePage'

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <h2>Painting house</h2>
                <NavBar />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/write" element={<WritePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App