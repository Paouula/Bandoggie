import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const useDataProducts = () => {
  const ApiProducts = "http://localhost:4000/api/productos";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [designImages, setDesignImages] = useState([]);
  const [idHolidayProduct, setIdHolidayProduct] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [errorProduct, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const cleanData = () => {
    setNameProduct("");
    setPrice("");
    setDescription("");
    setImage("");
    setDesignImages([]);
    setIdHolidayProduct("");
    setIdCategory("");
    setId("");
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  // Función para crear un nuevo producto
  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !nameProduct ||
      !price ||
      !description ||
      !image ||
      !idHolidayProduct ||
      !idCategory
    ) {
      setError("Todos los campos son obligatorios");
      toast.error('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    // Validar que el precio sea válido
    if (isNaN(price) || parseFloat(price) <= 0) {
      setError("El precio debe ser un número válido mayor a 0");
      toast.error('El precio debe ser un número válido mayor a 0');
      setLoading(false);
      return;
    }

    // Validar imágenes de diseño (mínimo 3, máximo 10)
    if (designImages.length < 3) {
      setError("Se requieren mínimo 3 imágenes de diseño");
      toast.error('Se requieren mínimo 3 imágenes de diseño');
      setLoading(false);
      return;
    }

    if (designImages.length > 10) {
      setError("Máximo 10 imágenes de diseño permitidas");
      toast.error('Máximo 10 imágenes de diseño permitidas');
      setLoading(false);
      return;
    }

    try {
      const productData = {
        nameProduct,
        price: parseFloat(price),
        description,
        image,
        designImages,
        idHolidayProduct,
        idCategory,
      };

      const response = await fetch(ApiProducts, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Hubo un error al registrar el producto");
      }

      const data = await response.json();
      toast.success('Producto registrado exitosamente');
      setSuccess("Producto registrado correctamente");
      cleanData();
      await fetchData(); // Asegurar que se actualice la lista
      
      // Llamar callback para cerrar modal
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
      toast.error(error.message || 'Ocurrió un error al registrar el producto');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener los datos de los productos
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(ApiProducts);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Productos obtenidos:", data);
      
      // Asegurar que data sea un array
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else if (data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.warn("Estructura de datos inesperada:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error('Error al cargar los productos');
      setError(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    if (!productId) {
      toast.error('ID de producto no válido');
      return;
    }

    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${ApiProducts}/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el producto");
      }

      toast.success('Producto eliminado exitosamente');
      await fetchData(); // Recargar la lista
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.message || 'Error al eliminar el producto');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = (dataProduct) => {
    if (!dataProduct || !dataProduct._id) {
      toast.error('Datos del producto no válidos');
      return;
    }

    setId(dataProduct._id);
    setNameProduct(dataProduct.nameProduct || "");
    setPrice(dataProduct.price?.toString() || "");
    setDescription(dataProduct.description || "");
    setImage(dataProduct.image || "");
    setDesignImages(dataProduct.designImages || []);
    setIdHolidayProduct(dataProduct.idHolidayProduct || "");
    setIdCategory(dataProduct.idCategory || "");
    setIsEditing(true);
    setError(null);
    setSuccess(null);
    setActiveTab("form");
  };

  const handleUpdate = async (e, onSuccess) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!id) {
      setError("ID del producto no encontrado");
      toast.error('ID del producto no encontrado');
      setLoading(false);
      return;
    }

    if (
      !nameProduct ||
      !price ||
      !description ||
      !image ||
      !idHolidayProduct ||
      !idCategory
    ) {
      setError("Todos los campos son obligatorios");
      toast.error('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    // Validar que el precio sea válido
    if (isNaN(price) || parseFloat(price) <= 0) {
      setError("El precio debe ser un número válido mayor a 0");
      toast.error('El precio debe ser un número válido mayor a 0');
      setLoading(false);
      return;
    }

    // Validar imágenes de diseño (mínimo 3, máximo 10)
    if (designImages.length < 3) {
      setError("Se requieren mínimo 3 imágenes de diseño");
      toast.error('Se requieren mínimo 3 imágenes de diseño');
      setLoading(false);
      return;
    }

    if (designImages.length > 10) {
      setError("Máximo 10 imágenes de diseño permitidas");
      toast.error('Máximo 10 imágenes de diseño permitidas');
      setLoading(false);
      return;
    }

    try {
      const updatedProduct = {
        nameProduct,
        price: parseFloat(price),
        description,
        image,
        designImages,
        idHolidayProduct,
        idCategory,
      };

      const response = await fetch(`${ApiProducts}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el producto");
      }

      toast.success('Producto actualizado exitosamente');
      setSuccess("Producto actualizado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchData(); // Recargar la lista
      
      // Llamar callback para cerrar modal
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
      toast.error(error.message || 'Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    id,
    setId,
    nameProduct,
    setNameProduct,
    price,
    setPrice,
    description,
    setDescription,
    image,
    setImage,
    designImages,
    setDesignImages,
    idHolidayProduct,
    setIdHolidayProduct,
    idCategory,
    setIdCategory,
    errorProduct,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    products,
    setProducts,
    isEditing,
    setIsEditing,
    cleanData,
    handleSubmit,
    fetchData,
    deleteProduct,
    updateProduct,
    handleUpdate,
  };
};

export default useDataProducts;