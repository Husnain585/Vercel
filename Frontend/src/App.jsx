import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import Routes from "./routes/Routes";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </GlobalProvider>
  );
}

export default App;
