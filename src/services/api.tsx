const API_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

//  Obtener lista de cócteles (solo categoría 'Cocktail')
export async function getCocktails() {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=Cocktail`);
    if (!response.ok) throw new Error("Error al obtener los cócteles");
    const data = await response.json();
    return data.drinks.slice(0, 20); // aca es donde se decide cuantos elementos traer
  } catch (error) {
    console.error("Error al obtener los cócteles:", error);
    throw error;
  }
}

// Obtener detalle de un cóctel por ID
export async function getCocktailDetail(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error("Error al obtener detalle del cóctel");
    const data = await response.json();
    return data.drinks[0];
  } catch (error) {
    console.error("Error al obtener detalle del cóctel:", error);
    throw error;
  }
}
