import { motion } from "framer-motion";
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiVite,
  SiFramer,
  SiEslint,
  SiReactrouter
} from "react-icons/si";
import { Zap } from "lucide-react";

const stacks = [
  { 
    name: "React 19", 
    icon: <SiReact className="w-12 h-12 text-[#61DAFB]" />,
    gradient: "from-cyan-400 to-blue-500"
  },
  { 
    name: "TypeScript", 
    icon: <SiTypescript className="w-12 h-12 text-[#3178C6]" />,
    gradient: "from-blue-500 to-blue-700"
  },
  { 
    name: "Tailwind CSS", 
    icon: <SiTailwindcss className="w-12 h-12 text-[#06B6D4]" />,
    gradient: "from-cyan-400 to-teal-500"
  },
  { 
    name: "Vite", 
    icon: <SiVite className="w-12 h-12 text-[#646CFF]" />,
    gradient: "from-purple-500 to-yellow-400"
  },
  { 
    name: "Framer Motion", 
    icon: <SiFramer className="w-12 h-12 text-[#0055FF]" />,
    gradient: "from-blue-600 to-purple-600"
  },
  { 
    name: "React Router", 
    icon: <SiReactrouter className="w-12 h-12 text-[#CA4245]" />,
    gradient: "from-red-500 to-pink-500"
  },
  { 
    name: "Lucide Icons", 
    icon: <Zap className="w-12 h-12 text-orange-500" />,
    gradient: "from-orange-400 to-red-500"
  },
  { 
    name: "ESLint", 
    icon: <SiEslint className="w-12 h-12 text-[#4B32C3]" />,
    gradient: "from-purple-600 to-indigo-600"
  },
];

export default function AcercaDe() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Título de la sección */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Stack Tecnológico
        </h2>
        <p className="text-gray-600 text-lg">
          Tecnologías utilizadas en este proyecto
        </p>
      </motion.div>

      {/* Grid de tecnologías */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stacks.map((stack, i) => (
          <motion.div
            key={stack.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="relative group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-linear-to-br ${stack.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Icon container with animation */}
            <motion.div 
              className="flex justify-center mb-4 relative z-10"
              whileHover={{ y: -8, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {stack.icon}
            </motion.div>
            
            {/* Stack name */}
            <p className="font-bold text-gray-800 text-base text-center relative z-10">
              {stack.name}
            </p>
            
            {/* Decorative border on hover */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${stack.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}