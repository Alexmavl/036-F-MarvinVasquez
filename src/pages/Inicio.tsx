import { motion } from "framer-motion";
import { GraduationCap, IdCard, Calendar } from "lucide-react";

export default function Inicio() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* Sección de Perfil */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left space-y-6"
        >
          {/* Foto de perfil */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              <img
                src="/image/perfil2.png"
                alt="Marvin Alexander Vásquez López"
                className="w-48 h-48 rounded-full object-cover shadow-2xl ring-4 ring-blue-500 ring-offset-4"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                <GraduationCap size={24} />
              </div>
            </div>
          </motion.div>

          {/* Información del estudiante */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-800">
              Marvin Alexander Vásquez López
            </h2>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <IdCard className="text-blue-600" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Carnet</p>
                  <p className="font-semibold text-gray-800">1790-22-12802</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Calendar className="text-purple-600" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">Ciclo</p>
                  <p className="font-semibold text-gray-800">Octavo</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sección de Universidad */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg text-center space-y-6"
        >
          <motion.img
            src="/image/LogotipoUMG.png"
            alt="Logotipo UMG"
            className="mx-auto w-40 drop-shadow-lg"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-blue-700">
              Universidad Mariano Gálvez de Guatemala
            </h1>
            <p className="text-blue-600 font-medium">
              Sede Chiquimulilla Santa Rosa
            </p>
             <p className="text-blue-600 font-medium">
              Facultad de Ingeniería en Sistemas de Información
            </p>
          </div>

          {/* Decoración */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}