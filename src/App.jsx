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
import { Switch } from 'react-router-dom/cjs/react-router-dom';

const queryClient = new QueryClient();

const App = ()=> {

  return (
    <QueryClientProvider client={queryClient} >
    <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/registration" component={RegistrationPage}/>
            <Route exact path="/signin" component={ SignIn}/>
            <Route exact path="/restaurant/:id" component={ DetailsPage }/>
            <ProtectedRoute exact strict path="/restaurant/:id/update" component={ UpdatePage }/>
            <ProtectedRoute exact path="/dashboard/manage" component={DashboardPage}/>
            <ProtectedRoute exact path="/home/:page" component={Home}/>
          </Switch>
        </Router>
    </div>
    </QueryClientProvider>
  );
}

export default App;
