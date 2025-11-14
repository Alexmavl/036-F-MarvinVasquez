import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, X } from "lucide-react";
import { getProducts } from "../services/api";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function Consumo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  // Calcular productos de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-gray-600 font-medium">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-600 font-medium">Error: {error}</p>
        <button
          onClick={fetchProducts}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Catálogo de Productos
          </h2>
          <p className="text-gray-600 text-lg">
            Explora nuestra colección de {products.length} productos
          </p>
        </motion.div>

        {/* Grid de productos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Imagen del producto */}
              <div className="relative h-56 bg-gray-100 flex items-center justify-center p-4 group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Categoría */}
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3 w-fit">
                  {product.category}
                </span>

                {/* Título */}
                <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 flex-1">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.round(product.rating.rate)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.rating.count})
                  </span>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {product.description}
                </p>

                {/* Botón */}
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 mt-auto"
                >
                  Ver Detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            {/* Botón Anterior */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white shadow-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-blue-600" />
            </button>

            {/* Números de página */}
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white shadow-lg scale-110"
                          : "bg-white text-gray-700 hover:bg-blue-50 shadow-md"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={pageNumber} className="w-10 h-10 flex items-center justify-center">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white shadow-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </button>
          </motion.div>
        )}

        {/* Info de paginación */}
        <div className="text-center mt-4 text-gray-600 text-sm">
          Mostrando {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, products.length)} de {products.length} productos
        </div>
      </section>

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header del Modal */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">
                  Detalles del Producto
                </h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Imagen */}
                  <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-center">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                      className="max-h-80 object-contain"
                    />
                  </div>

                  {/* Información */}
                  <div className="space-y-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-3">
                        {selectedProduct.category}
                      </span>
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">
                        {selectedProduct.title}
                      </h4>
                    </div>

                    {/* Precio */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Precio</p>
                      <p className="text-3xl font-bold text-blue-600">
                        ${selectedProduct.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-2xl ${
                              i < Math.round(selectedProduct.rating.rate)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-600">
                        {selectedProduct.rating.rate} ({selectedProduct.rating.count} reseñas)
                      </span>
                    </div>

                    {/* Descripción */}
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Descripción</h5>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Botones de acción */}
                    <div className="space-y-3 pt-4">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Agregar al Carrito
                      </button>
                      <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Comprar Ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}