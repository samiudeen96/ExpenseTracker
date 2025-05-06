import React, { useContext } from "react";
import { ExpContext } from "../../context/ExpContext";

const Login = () => {
  const { setTab, formData, onChangeHandler, onSubmitHandler } =
    useContext(ExpContext);

  return (
    <div className="mt-5">
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-3">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="p-2 w-full border-2 border-slate-200 rounded-md focus:outline-none focus:border-[#785bf8]"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="p-2 w-full border-2 border-slate-200 rounded-md focus:outline-none focus:border-[#785bf8]"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <button
          type="submit"
          className="button_primary w-full mt-6 bg-[#785bf8] text-white py-2 rounded hover:bg-[#674de0] transition"
        >
          Login
        </button>

        <p className="text-center mt-6 text-sm">
          Not a member?{" "}
          <span
            className="text-[#785bf8] cursor-pointer underline"
            onClick={() => setTab("Signup")}
          >
            Signup{" "}
          </span>
          now
        </p>
      </form>
    </div>
  );
};

export default Login;
