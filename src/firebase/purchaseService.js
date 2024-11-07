import { get, push, ref, set } from "firebase/database";
import { db } from "./firebaseConfig";

export async function addPurchase(purchaseData) {
  try {
    const purchaseRef = ref(db, "compras"); // Referencia a la colección de compras
    const newPurchaseRef = push(purchaseRef); // Crea una nueva entrada con ID único
    await set(newPurchaseRef, purchaseData); // Inserta los datos de la compra
    return newPurchaseRef.key; // Retorna el ID generado
  } catch (error) {
    console.error("Error al agregar la compra: ", error);
    throw error;
  }
}

export async function getAllPurchases() {
  try {
    const productsRef = ref(db, "compras"); // Referencia a la colección de productos
    const snapshot = await get(productsRef);

    if (snapshot.exists()) {
      const products = snapshot.val();
      // Convierte el objeto en un array de productos
      return Object.keys(products).map((key) => ({
        id: key, // Cada clave es el ID del producto en Realtime Database
        ...products[key],
      }));
    } else {
      return []; // Retorna un array vacío si no hay productos
    }
  } catch (error) {
    console.error("Error al obtener productos: ", error);
    throw error;
  }
}
