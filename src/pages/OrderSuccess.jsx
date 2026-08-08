import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      <main className="max-w-xl mx-auto px-6 pt-32 pb-16 text-center">
        <CheckCircle2 className="w-12 h-12 text-accent-lime mx-auto mb-4" />
        <h1 className="font-display text-2xl font-semibold mb-2">
          Payment <span className="gradient-text">Successful</span>
        </h1>
        <p className="text-sm text-muted mb-1">
          Thank you — your order has been placed.
        </p>
        {sessionId && (
          <p className="text-xs text-muted/70 mb-6">Reference: {sessionId}</p>
        )}

        <Link to="/profile">
          <Button variant="primary" className="mt-4">
            View My Orders
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default OrderSuccess;
