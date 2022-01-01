import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
// import { Switch } from "react-router";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignUpPage";
import PrivateRoute from "./routes/PrivateRoute";
import UserAdsPage from "./components/userAds/userAdsPage";
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact element={<HomePage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/user/ad/:userId"
          element={
            <PrivateRoute>
              <UserAdsPage />
            </PrivateRoute>
          }
        />
      </Switch>
    </Layout>
  );
}

export default App;
