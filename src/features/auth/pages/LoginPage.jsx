import { useState } from "react";
import { useDispatch } from "react-redux";
import SignUpForm from "../components/SignUpForm";
import toast from "react-hot-toast";
import { login } from "../store/authSlice";
import { initializeCart } from "../../cart/store/cartSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.email || !formData.password || formData.password.length < 4) {
      return toast.error("Please fill in all required fields.");
    }
    try {
      setIsLoading(true);
      await dispatch(login(formData)).unwrap();
      await dispatch(initializeCart()).unwrap();
      // Toast and navigation are handled in the thunk or via redirect logic
      setFormData({ email: "", password: "" });
    } catch (err) {
      // Error toast is already handled in thunk, but can add extra here if needed
      console.error("Login component error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SignUpForm
        mode="login"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
