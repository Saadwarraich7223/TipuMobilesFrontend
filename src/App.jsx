import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes />
    </>
  );
};

export default App;
