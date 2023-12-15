import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { Loader } from "semantic-ui-react";
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from "./context/UserContextProvider";
import Presale from "./pages/Presale";


function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="text-center py-5 mt-5">
            <Loader size="large" active>
            </Loader>
          </div>
        }
      >
        <UserContextProvider> 
        <Routes>
          <Route path="/airdrop/claim" element={<Presale />} />
        </Routes>
        </UserContextProvider>
      </Suspense>
    </Router>
  );
}

export default App;
