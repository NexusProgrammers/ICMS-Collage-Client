import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  About,
  Account,
  Apply,
  Contact,
  ForgotPassword,
  Home,
  NotFound,
  ResetPassword,
  SignIn,
  SignUp,
  UpdateApply,
} from "./pages";
import {
  AccountVerificationAlert,
  ForgotPasswordAlert,
  Header,
  ProtectResetPassword,
  ProtectRoute,
  PublicRoute,
} from "./components";

const App = () => {
  return (
    <Router>
      <Header />    
      <AccountVerificationAlert />
      <ForgotPasswordAlert />
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot/password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/reset/password/:id"
          element={
            <ProtectResetPassword>
              <ResetPassword />
            </ProtectResetPassword>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectRoute>
              <Account />
            </ProtectRoute>
          }
        />

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/apply" element={<Apply />} />

        <Route
          path="/update/apply/:id"
          element={
            <ProtectRoute>
              <UpdateApply />
            </ProtectRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
