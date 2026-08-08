import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";
import BackToTop from "./components/common/BackToTop";
import "./index.css";
import WhatsAppButton from "./components/common/WhatsAppButton";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
      <BackToTop />
      <WhatsAppButton phoneNumber="923099077062" />
    </BrowserRouter>
  );
}
