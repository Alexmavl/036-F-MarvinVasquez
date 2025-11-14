const API_BASE_URL = "https://fakestoreapi.com";

// Función genérica GET
export async function getData(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
}

// Función genérica POST
export async function postData(endpoint: string, data: unknown) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error al enviar datos:", error);
    throw error;
  }
}

// Función específica para obtener productos
export async function getProducts() {
  return getData("/products");
}

// Función para obtener un producto por ID
export async function getProductById(id: number) {
  return getData(`/products/${id}`);
}

// Función para obtener categorías
export async function getCategories() {
  return getData("/products/categories");
}

// Función para obtener productos por categoría
export async function getProductsByCategory(category: string) {
  return getData(`/products/category/${category}`);
}