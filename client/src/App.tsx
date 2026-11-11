import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Landing</div>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path='/experiences' element={<div>Experiences</div>} />
          <Route path="/experiences/:blogId" element={<div>Individual Experience</div>} />
          <Route path='/questions' element={<div>Questions</div>} />
          <Route path='/resources' element={<div>Resources</div>} />
          <Route path='/drives' element={<div>Drives</div>}/>
          <Route path='/drives/:driveId' element={<div>Individual Drive</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
