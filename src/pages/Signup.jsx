import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/common/footer";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../utils/Firebase-config";

export default function SignUp() {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { email, password } = formdata;
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      return;
    }

    // Validate password format (at least one uppercase, one lowercase, and one special character)
    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must contain at least 6 characters.",
      }));
      return;
    }

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      // setErrors((prev) => ({
      //   ...prev,
      //   email: "Email verification link sent.",
      // }));
      // sendSignInLinkToEmail(email);
    } catch (error) {
      const msg = error.code.split("/");
      setErrors((prev) => ({
        ...prev,
        password: msg[1],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currUser) => {
      if (currUser) navigate("/");
    });
  }, [navigate]);
  return (
    <>
      <Navbar />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
          <div>
            <label
              htmlFor="email"
              className="flex justify-starttext-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => handleChange(e)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    marginBottom: "-1.1rem",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="flex justify-starttext-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => handleChange(e)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    marginBottom: "-1.1rem",
                  }}
                >
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="py-2 ">
            <button
              onClick={handleSignIn}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Account
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
