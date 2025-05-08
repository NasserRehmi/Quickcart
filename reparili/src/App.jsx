import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from "./components/PrivateRoute";
import Details from "./components/Details";
import BuilderList from "./components/BuilderList";
import BuilderProfile from "./components/BuilderProfile";
import WorkRequest from "./components/WorkRequest";
import PublicRoute from "./components/PublicRoute";
import UpdateBuilder from "./components/UpdateBuilder";
import ClientWork from "./components/ClientWork";
import Request from "./components/Request";
import AdminDashboard from "./components/AdminDashboard";
import ManageClients from "./components/ManageClient";
import ManageAdmins from "./components/ManageAdmins";
import ManageBuilders from "./components/ManageBuilders";
import WorkRequestDetails from "./components/WorkRequestDetails";
import ManageReclamations from "./components/ManageReclamations";
import PassReclamation from "./components/PassReclamations";
import AdminEditBuilder from "./components/AdminEditBuilder";
import AdminEditClient from "./components/AdminEditClient";
import AdminEditAdmin from "./components/AdminEditAdmin";
import AddClient from "./components/AddClient";
import AddBuilder from "./components/AddBuilder";
import AddAdmin from "./components/AddAdmin";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
        <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/builders" element={<PrivateRoute><BuilderList /></PrivateRoute>} />
        <Route path="/builders/builderprofile/:cin" element={<PrivateRoute><BuilderProfile /></PrivateRoute>} />
        <Route path="/builder/details/:cin" element={<PrivateRoute><Details /></PrivateRoute>} />
        <Route path="/updatebuilder" element={<PrivateRoute><UpdateBuilder /></PrivateRoute>} />
        <Route path="/workrequest" element={<PrivateRoute><WorkRequest /></PrivateRoute>} />
        <Route path="/workrequest/:builderCin" element={<PrivateRoute><WorkRequest /></PrivateRoute>} />
        <Route path="/workrequest/details/:id" element={<WorkRequestDetails />} />
        <Route path="/clientwork/:clientCin" element={<PrivateRoute><ClientWork /></PrivateRoute>} />
        <Route path="/request/:cin" element={<PrivateRoute><Request /></PrivateRoute>} />
        <Route path="/Reclamation" element={<PrivateRoute><PassReclamation /></PrivateRoute>} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />
        <Route path="/admin/clients" element={<PrivateRoute><ManageClients/></PrivateRoute>} />
        <Route path="/admin/admins" element={<PrivateRoute><ManageAdmins/></PrivateRoute>} />
        <Route path="/admin/builders" element={<PrivateRoute><ManageBuilders/></PrivateRoute>} />
        <Route path="/admin/reclamations" element={<PrivateRoute><ManageReclamations/></PrivateRoute>} />
        <Route path="/editbuilder/:cin" element={<PrivateRoute><AdminEditBuilder /></PrivateRoute>} />
        <Route path="/editclient/:cin" element={<PrivateRoute><AdminEditClient /></PrivateRoute>} />
        <Route path="/editadmin/:cin" element={<PrivateRoute><AdminEditAdmin /></PrivateRoute>} />
        <Route path="/admin/addclient" element={<PrivateRoute><AddClient/></PrivateRoute>} />
        <Route path="/admin/addbuilder" element={<PrivateRoute><AddBuilder/></PrivateRoute>} />
        <Route path="/admin/addadmin" element={<PrivateRoute><AddAdmin/></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;