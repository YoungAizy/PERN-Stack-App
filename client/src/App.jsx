import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./pages/LandingPage"
import Home from "./pages/Home";
import DetailsPage from "./pages/DetailsPage";
import UpdatePage from "./pages/UpdatePage";
import DashboardPage from './pages/DashboardPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import SignIn from './pages/SignIn';
import ProtectedRoute from './pages/ProtectedRoute';
import RegistrationPage from './pages/RegistrationPage';

const queryClient = new QueryClient();

const App = ()=> {
  return (
    <QueryClientProvider client={queryClient} >
    <div>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={RegistrationPage}/>
          <ProtectedRoute exact path="/dashboard" component={Home}/>
          <Route path="/signin" component={ SignIn}/>
          <Route exact path="/restaurant/:id" component={ DetailsPage }/>
          <Route exact path="/restaurant/:id/update" component={ UpdatePage }/>
          <Route exact path="/manage" component={DashboardPage}/>
        </Router>
    </div>
    </QueryClientProvider>
  );
}

export default App;
