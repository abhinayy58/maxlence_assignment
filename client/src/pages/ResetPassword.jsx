import { useForm } from "react-hook-form";
import axios from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post(`/auth/reset-password/${token}`, {
        password: data.password,
      });
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Invalid or expired token.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="New password"
          className="w-full px-4 py-2 mb-3 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Set New Password
        </button>
      </form>
    </div>
  );
}


export default  ResetPassword