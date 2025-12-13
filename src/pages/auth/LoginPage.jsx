import { useState } from "react";
import SignUpForm from "../../components/common/SignUpForm/SignUpForm";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function LoginPage() {
  const { login } = useAuthContext();
  const { initializeCart } = useCart();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!formData.email || !formData.password || formData.password.length < 4) {
      return toast.error("Please fill in all required fields.");
    }
    try {
      setIsLoading(true);
      await login(formData);
      await initializeCart();

      toast.success("Logged in successfully!");
      setFormData({ email: "", password: "" });
    } catch (err) {
      console.error("Register error:", err);

      // Handle multiple error messages
      const errors = err.response?.data?.errors ||
        err.response?.data?.message || ["Something went wrong"];

      if (Array.isArray(errors)) {
        errors.forEach((msg) => toast.error(msg));
      } else {
        toast.error(errors);
      }
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
