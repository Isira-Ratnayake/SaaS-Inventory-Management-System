import SideNavigation from "../components/SideNavigation";
import logo from "../assets/images/logo.png";
import { Form, redirect } from "react-router-dom";

export function loader() {
  return null;
}
export function action() {
  return null;
}
export default function Login() {
  return (
    <>
      <div className="login-container">
        <div className="row h-100">
          <div className="col-8 img-col"></div>
          <div className="col form-col">
            <div className="text-center">
              <img className="img-fluid logo-fix" src={logo} />
            </div>
            <Form method="get" action="/invoices">
              <div className="mb-3 mt-5">
                <label htmlFor="username" className="form-label fw-bold">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control border-dark-subtle"
                  id="username"
                  name=""
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control border-dark-subtle"
                  id="password"
                  name=""
                />
              </div>
              <div className="text-center mt-5 d-flex">
                <button type="submit" className="btn btn-dark w-100 fw-bold">
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
