import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Leads from "./pages/Leads"
import ProtectedRoute from "./components/ProtectedRoute"
import LeadDetails from "./pages/LeadDetails"
import EditLead from "./pages/EditLead"
import CreateLead from "./pages/CreateLead"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  
  return (
    <>
     <BrowserRouter>
     
     <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/:id"
          element={
            <ProtectedRoute>
              <LeadDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/:id/edit"
          element={
            <ProtectedRoute>
              <EditLead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/create"
          element={
            <ProtectedRoute>
              <CreateLead />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
     
     </Routes>

     </BrowserRouter>
     
    </>
  )
}

export default App
