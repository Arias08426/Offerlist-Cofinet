import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import Header from "@/components/Header";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Cofinet — Offer List",
  description: "Specialty green coffee offer list — Where Speciality Begins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-[#f4f0ea]">
        <DataProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="bg-[#18362f] text-white/90 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Contacto */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-lg font-display mb-6">Contacto General</h4>
                  <p className="flex items-center gap-3 text-[0.95rem]">
                    <Mail className="w-5 h-5 text-white/70" /> ventas@cofinet.com.au
                  </p>
                  <p className="flex items-center gap-3 text-[0.95rem]">
                    <Phone className="w-5 h-5 text-white/70" /> +57 310 860 5922
                  </p>
                  <p className="flex items-start gap-3 text-[0.95rem]">
                    <MapPin className="w-5 h-5 mt-0.5 text-white/70" /> 
                    <span>
                      Oficina Principal<br/>
                      Armenia, Colombia
                    </span>
                  </p>
                </div>

                {/* Sobre nosotros */}
                <div>
                  <h4 className="text-white font-bold text-lg font-display mb-6">Sobre Nosotros</h4>
                  <p className="text-[0.95rem] leading-relaxed text-white/80 pr-4">
                    Exportamos café colombiano de alta calidad a nivel mundial. Nuestro compromiso es entregar granos seleccionados directamente desde las mejores fincas del país.
                  </p>
                </div>

                {/* Síguenos */}
                <div>
                  <h4 className="text-white font-bold text-lg font-display mb-6">Síguenos</h4>
                  <div className="flex items-center gap-3">
                    <a href="#" className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-white/70" />
                  <span>©2026 Todos los derechos reservados</span>
                </div>
              </div>
            </div>
          </footer>
        </DataProvider>
      </body>
    </html>
  );
}
