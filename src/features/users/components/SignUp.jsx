import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../userApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "tenant2",
    email: "aman29bm@gmail.com",
    password: "password1234",
    role: "tenant",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [signup, { isLoading, error }] = useSignupMutation();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.role || formData.role === "Choose a Role") {
      errors.role = "Please select a role";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await signup(formData);
        if (response.error) {
          toast.error(response.error.data.error);
        } else {
          if (response.data.error) {
            toast.error(response.data.error);
          } else {
            const { message } = response.data;
            toast.success(`${message}, now you can login`);
            setFormData({
              username: "",
              email: "",
              password: "",
              role: "tenant",
            });
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Signup failed: " + error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {isLoading ? (
        <ImSpinner2 className="mx-auto mt-[200px] animate-spin text-4xl text-violet-700" />
      ) : (
        <section className="m-auto flex items-center justify-center bg-white">
          <form
            onSubmit={handleSubmit}
            className="m-4 flex flex-col items-center gap-4 sm:m-0"
          >
            <div>
              <h1 className=" text-center text-3xl font-semibold leading-none lg:text-[38px]">
                <span className="text-violet-700">Register</span> to creat an
                account
              </h1>
              <p className=" text-center">
                welcome Back please fill your credentials
              </p>
            </div>
            <div className="mb-4 mt-5 w-full">
              <p className="my-2">Username</p>
              <input
                type="text"
                name="username"
                className={`h-12 w-full rounded border border-gray-300 px-4 text-sm outline-none focus:border-violet-700 ${errors.username && "border-red-500"}`}
                placeholder="Please enter your username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <p className="my-2">Email</p>
              <input
                type="email"
                name="email"
                className={`h-12 w-full rounded border border-gray-300 px-4 text-sm outline-none focus:border-violet-700 ${errors.email && "border-red-500"}`}
                placeholder="Please enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <p className="my-2">Password</p>
              <input
                type="password"
                name="password"
                className={`h-12 w-full rounded border border-gray-300 px-4 text-sm outline-none focus:border-violet-700 ${errors.password && "border-red-500"}`}
                placeholder="Please enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <p className="my-2">Register as</p>
              <select
                name="role"
                className={`block h-12 w-full rounded border border-gray-300 bg-white px-3 text-sm outline-none focus:border-violet-700 ${errors.role && "border-red-500"}`}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="broker">Broker</option>
                <option value="landlord">Landlord</option>
                <option value="tenant">Tenant</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-500">{errors.role}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <button
                type="submit"
                className="w-full rounded bg-violet-700 p-4 text-sm text-white transition hover:bg-violet-800"
              >
                Register
              </button>
            </div>
            <div className="mb-4 flex w-full gap-2">
              <p className="">already have account ?</p>
              <Link to="/login" className="text-violet-700">
                login{" "}
              </Link>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

export default SignUp;
