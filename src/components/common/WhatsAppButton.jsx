import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({
  phoneNumber,
  message = "Hi! I have a question about Voltrix.",
}) {
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] 
                 text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30"
    >
      <FaWhatsapp className="w-7 h-7" />
    </motion.a>
  );
}
