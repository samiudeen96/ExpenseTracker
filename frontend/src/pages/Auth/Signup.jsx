import React, { useContext } from "react";
import { ExpContext } from "../../context/ExpContext";
const Signup = () => {
  const { setTab, formData, onChangeHandler, onSubmitHandler } =
    useContext(ExpContext);

  return (
    <div className="mt-5">
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-3">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="p-2 w-full border-2 border-slate-200 rounded-md focus:outline-none focus:border-[#785bf8]"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="p-2 w-full border-2 border-slate-200 rounded-md focus:outline-none focus:border-[#785bf8]"
              placeholder="Enter your email"
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

        <button type="submit" className="button_primary w-full mt-6">
          Signup
        </button>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <span
            className="text-[#785bf8] cursor-pointer underline"
            onClick={() => setTab("Login")}
          >
            login{" "}
          </span>
          now
        </p>
      </form>
    </div>
  );
};

export default Signup;
