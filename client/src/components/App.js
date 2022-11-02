import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UploadCasePage from "./views/UploadCasePage/UploadCasePage.js";
import DetailCasePage from "./views/DetailCasePage/DetailCasePage.js"
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";


//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/case/upload" component={Auth(UploadCasePage, true)} />
          <Route exact path="/case/:dataNumber" component={Auth(DetailCasePage, null)} /> 
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

// :dataNumber //  :caseId

export default App;
