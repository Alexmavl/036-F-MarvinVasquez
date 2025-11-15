import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getCocktails, getCocktailDetail } from "../services/api";

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface CocktailDetail extends Cocktail {
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
}

export default function Consumo() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [selected, setSelected] = useState<CocktailDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cocktailsPerPage = 8;

  // Cargar cócteles
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCocktails();
        setCocktails(data);
      } catch {
        setError("No se pudieron cargar los cócteles.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Abrir modal de detalle
  const handleOpenDetail = async (id: string) => {
    try {
      setLoadingDetail(true);
      const detail = await getCocktailDetail(id);
      setSelected(detail);
    } catch {
      setError("Error al obtener el detalle del cóctel.");
    } finally {
      setLoadingDetail(false);
    }
  };

  // Calcular cócteles a mostrar
  const indexOfLast = currentPage * cocktailsPerPage;
  const indexOfFirst = indexOfLast - cocktailsPerPage;
  const currentCocktails = cocktails.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-gray-600 font-medium">Cargando cócteles...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">
            Lista de Cócteles
          </h2>
          <p className="text-gray-600 text-lg">
            Haz clic en una imagen para ver más información 🍸
          </p>
        </motion.div>

        {/* Grid de cócteles */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentCocktails.map((drink, index) => (
            <motion.div
              key={drink.idDrink}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleOpenDetail(drink.idDrink)}
              className="relative bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition cursor-pointer group"
            >
              {/* Imagen visible siempre */}
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Ícono flotante */}
              <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-blue-700 font-semibold text-sm hidden group-hover:inline">
                  Ver detalles
                </span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-600 rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Nombre del cóctel */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {drink.strDrink}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            {/* Botón anterior */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white shadow hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-blue-600" />
            </button>

            {/* Números */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    page === currentPage
                      ? "bg-blue-600 text-white shadow-lg scale-110"
                      : "bg-white text-gray-700 hover:bg-blue-50 shadow"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Botón siguiente */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white shadow hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        )}

        {/* Info de paginación */}
        <div className="text-center mt-4 text-gray-600 text-sm">
          Mostrando {indexOfFirst + 1} -{" "}
          {Math.min(indexOfLast, cocktails.length)} de {cocktails.length} cócteles
        </div>
      </section>

      {/* Modal Detalle */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
            >
              {loadingDetail ? (
                <div className="p-8 flex justify-center">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="relative">
                    <img
                      src={selected.strDrinkThumb}
                      alt={selected.strDrink}
                      className="w-full h-72 object-cover"
                    />
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  <div className="p-6 space-y-3 text-gray-700">
                    <h3 className="text-2xl font-bold text-blue-700">
                      {selected.strDrink}
                    </h3>
                    <p>
                      <strong>Categoría:</strong> {selected.strCategory}
                    </p>
                    <p>
                      <strong>Tipo:</strong> {selected.strAlcoholic}
                    </p>
                    <p>
                      <strong>Vaso:</strong> {selected.strGlass}
                    </p>
                    <p className="leading-relaxed">
                      <strong>Instrucciones:</strong> {selected.strInstructions}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
