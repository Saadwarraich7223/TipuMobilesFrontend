import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SignUpForm from "../components/SignUpForm";
import toast from "react-hot-toast";
import { register } from "../store/authSlice";
import { initializeCart } from "../../cart/store/cartSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.password ||
      formData.password.length < 4 ||
      !formData.name
    ) {
      return toast.error("Please fill in all required fields.");
    }
    try {
      setIsLoading(true);
      await dispatch(register(formData)).unwrap();
      await dispatch(initializeCart()).unwrap();
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      console.error("Register component error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SignUpForm
        mode="register"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RegisterPage;
