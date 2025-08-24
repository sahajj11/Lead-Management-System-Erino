import { BrowserRouter, Route, Routes } from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import Leads from "./pages/Leads"
import ProtectedRoute from "./components/ProtectedRoute"
import LeadDetails from "./pages/LeadDetails"
import EditLead from "./pages/EditLead"
import CreateLead from "./pages/CreateLead"


function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/leads/:id" element={<LeadDetails />} />
      <Route path="/leads/:id/edit" element={<EditLead />} />
      <Route path="/leads/create" element={<CreateLead />} />
     </Routes>
     </BrowserRouter>
     
    </>
  )
}

export default App
