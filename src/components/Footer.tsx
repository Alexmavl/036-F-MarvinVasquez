import { Mail, Building2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-linear-to-r from-blue-600 to-blue-800 text-white z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          {/* Ubicación */}
          <div className="flex items-center gap-2 text-sm">
            <Building2 size={16} />
            <span className="text-blue-100">Universidad Mariano Gálvez de Guatemala</span>
          </div>

          {/* Contacto */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href="https://wa.me/50259689072"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
              title="+502 5968 9072"
            >
              <FaWhatsapp size={20} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href="mailto:mvasquezl20@miumg.edu.gt"
              className="text-blue-100 hover:text-white transition-colors flex items-center gap-2"
              title="mvasquezl20@miumg.edu.gt"
            >
              <Mail size={20} />
              <span className="hidden sm:inline">mvasquezl20@miumg.edu.gt</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-blue-100">
            © {new Date().getFullYear()} mavasquezlopez. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}