import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "./Products.css";
import BannerProduct from "../../../img/Products/ProductBanner.png";
import BannerPrivate from "../../../components/Private/BannerPrivate/BannerPrivate.jsx";
import AgregarButton from "../../../components/Private/AgregarButton.jsx";
import SearchIcon from "@mui/icons-material/Search";
import Paginacion from "../../../components/Pagination.jsx";
import ListProducts from "../../../components/Private/Products/ListProducts.jsx";

//Importacion de los hooks para obtener los productos, categorias y festividades
import useFetchHolidays from "../../../hooks/Holidays/useFetchHolidays.js";
import useFetchProducts from "../../../hooks/Products/useFetchProducts.js";
import useFetchCategory from "../../../hooks/Categories/useFetchCategory.js";

//Importacion del componente Modal y del hook useForm
import Modal from "../../../components/Modal/Modal.jsx";
import { useForm } from "react-hook-form";

//Importacion de componentes para el uso de formularios
import Input from "../../../components/Input/Input.jsx";
import Button from "../../../components/Button/Button.jsx";
import TextArea from "../../../components/TextArea/TextArea.jsx";
import ImageUploader from "../../../components/ImageUploader/ImageUploader.jsx";
import MultiImageUploader from "../../../components/MultiImageUploader/MultiImageUploader.jsx";
import InputSelect from "../../../components/InputSelect/InputSelect.jsx";
import { da, se } from "date-fns/locale";

//Importacion de componente de recarga
import Loading from "../../../components/LoadingScreen/LoadingScreen.jsx";

const Products = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const formCategory = useForm();

  const formHoliday = useForm();

  useEffect(() => {
    register("designImages", {
      required: "Debes subir al menos una imagen de diseño",
      validate: (files) =>
        (files && files.length >= 3) ||
        "Debes subir al menos 3 imágenes de diseño",
    });

    register("image", {
      required: "La imagen principal es obligatoria",
    });
  }, [register]);

  //Estados para manejar el modal de edición y eliminacion de productos
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showCreateHolidayModal, setShowCreateHolidayModal] = useState(false);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [createDesignImages, setCreateDesignImages] = useState([]);
  const [editDesignImages, setEditDesignImages] = useState([]);

  // Estados para manejar la búsqueda y la lista de productos
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [holidays, setHolidays] = useState([]);

  // Hooks personalizados para manejar las operaciones de productos
  // Estos hooks encapsulan la lógica de las peticiones a la API
  const {
    handleGetProducts,
    handlePostProducts,
    handleDeleteProducts,
    handlePutProducts,
  } = useFetchProducts();

  const { handleGetCategories, handlePostCategory } = useFetchCategory();

  const { handleGetHolidays, handlePostHoliday } = useFetchHolidays();

  // Efecto para cargar los productos al montar el componente
  const loadProducts = async () => {
    try {
      const data = await handleGetProducts();
      //console.log("Productos cargados:", data);
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los productos");
    }
  };

  // Efecto para cargar las categorías
  const loadCategories = async () => {
    try {
      const data = await handleGetCategories();
      //console.log("Categorías cargadas:", data);
      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las categorías");
    }
  };

  // Efecto para cargar las festividades
  const loadHolidays = async () => {
    try {
      const data = await handleGetHolidays();
      //console.log("Festividades cargadas:", data);
      setHolidays(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las festividades");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        await Promise.all([loadProducts(), loadCategories(), loadHolidays()]);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Funciones para abrir los modales de creación, edición y eliminación
  const handleOpenCreate = () => {
    setSelectedProduct(null);
    reset({
      nameProduct: "",
      price: "",
      description: "",
      image: null,
      designImages: [],
      idCategory: "",
      idHolidayProduct: "",
    });
    setImage(null);
    setCreateDesignImages([]);
    setShowCreateModal(true);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // Función para manejar el envío del formulario al crear un producto
  const onCreateProduct = async (data) => {
    console.log("Images:", image);
    console.log("designImages:", data.designImages);

    if (!image || image.length === 0) {
      toast.error("Debes subir al menos una imagen principal");
      return;
    }

    if (!data.designImages || data.designImages.length < 3) {
      toast.error("Debes subir al menos 3 imágenes de diseño");
      return;
    }

    try {
      const productData = {
        nameProduct: data.nameProduct,
        price: data.price,
        description: data.description,
        image,
        designImages: createDesignImages,
        idCategory: data.idCategory,
        idHolidayProduct: data.idHolidayProduct,
      };

      setLoading(true);
      await handlePostProducts(productData);
      setShowCreateModal(false);
      reset();
      await loadProducts();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el envío del formulario al actualizar
  const onSubmit = async (data) => {
    /*if (
      !data.nameProduct ||
      !data.price ||
      !data.description ||
      !image ||
      !designImages.length < 3 ||
      !data.idCategory ||
      !data.idHolidayProduct
    ) {
      toast.dismiss();
      toast.error("Por favor, ingresa todos los datos.", { id: "fields" });
      return;
    }*/
    try {
      const productData = {
        nameProduct: data.nameProduct,
        price: data.price,
        description: data.description,
        image,
        designImages: editDesignImages,
        idCategory: data.idCategory,
        idHolidayProduct: data.idHolidayProduct,
      };

      setLoading(true);
      await handlePutProducts(selectedProduct._id, productData);
      setShowEditModal(false);
      setSelectedProduct(null);
      reset();
      await loadProducts();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la eliminación de un producto
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setProducts(products.filter((p) => p._id !== id));
      await handleDeleteProducts(id);
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Funciones para manejar el envío de formularios de categorías
  const onSubmitCategory = async (data) => {
    if (!data.nameCategory) {
      toast.dismiss();
      toast.error("Por favor, ingresa todos los datos.", { id: "fields" });
      return;
    }
    try {
      const categoryData = {
        nameCategory: data.nameCategory,
      };
      const response = await handlePostCategory(categoryData);

      if (response) {
        setShowCreateCategoryModal(false);
        reset();
        await loadCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al crear la categoría");
    }
  };

  // Funciones para manejar el envío de formularios de festividades
  const onSubmitHoliday = async (data) => {
    if (!data.nameHoliday) {
      toast.dismiss();
      toast.error("Por favor, ingresa todos los datos.", { id: "fields" });
      return;
    }
    try {
      const holidayData = {
        nameHoliday: data.nameHoliday,
      };

      const response = await handlePostHoliday(holidayData);

      if (response) {
        setShowCreateHolidayModal(false);
        reset();
        await loadHolidays();
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al crear la festividad");
    }
  };

  // Función para manejar el envío del formulario de edición

  const selectedProductData = async () => {
    if (selectedProduct) {
      reset({
        nameProduct: selectedProduct.nameProduct || "",
        price: selectedProduct.price || "",
        description: selectedProduct.description || "",
        image: selectedProduct.image || null,
        designImages: selectedProduct.designImages || [],
        idCategory: selectedProduct.idCategory?._id || "",
        idHolidayProduct: selectedProduct.idHolidayProduct?._id || "",
      });

      setImage(selectedProduct.image || null);
      setEditDesignImages(selectedProduct.designImages || []);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await selectedProductData();
    };
    fetchData();
  }, [selectedProduct, reset]);

  // Función para cerrar el modal de edición y limpiar los campos
  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedProduct(null);
    setShowCreateModal(false);
    reset(); // limpia el formulario
  };

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter((p) =>
    p.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {loading && (
        <div className="loading-overlay">
          <Loading message="Cargando productos..." />
        </div>
      )}

      {showCreateModal && (
        <Modal
          title="Crear nuevo producto"
          onClose={handleCloseModal}
          actions={
            <Button onClick={handleSubmit(onCreateProduct)}>Guardar</Button>
          }
        >
          <form className="form-edit-generic">
            <Input
              {...register("nameProduct", {
                required: "El nombre del producto es obligatorio",
              })}
              placeholder="Nombre del producto"
            />
            {errors.nameProduct && (
              <span className="form-error">{errors.nameProduct.message}</span>
            )}

            <Input
              type="number"
              step="0.01"
              {...register("price", {
                required: "El precio es obligatorio",
                min: {
                  value: 0,
                  message: "El precio no puede ser negativo",
                },
                validate: (value) => {
                  const regex = /^\d+\.\d{2}$/;
                  return regex.test(value)
                    ? true
                    : "El precio debe tener dos decimales, ej. 7.00 o 7.50";
                },
              })}
              placeholder="Precio"
              onBlur={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  const formatted = value.toFixed(2);
                  setValue("price", formatted, { shouldValidate: true });
                }
              }}
            />

            {errors.price && (
              <span className="form-error">{errors.price.message}</span>
            )}

            <TextArea
              {...register("description", {
                required: "La descripción es obligatoria",
                maxLength: {
                  value: 235,
                  message: "Has alcanzado el límite de 235 caracteres",
                },
                validate: (value) =>
                  !/\n/.test(value) || "No se permiten saltos de línea",
              })}
              placeholder="Descripción"
              id="description"
              maxLength={235}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            {errors.description && (
              <span className="form-error">{errors.description.message}</span>
            )}

            <ImageUploader
              onImageSelect={(file) => {
                setImage(file);
                setValue("image", file, { shouldValidate: true });
              }}
              error={errors.image}
              accept="image/*"
            />
            {errors.image && (
              <span className="form-error">
                La imagen principal es obligatoria
              </span>
            )}

            <MultiImageUploader
              onImagesSelect={(files) => {
                setCreateDesignImages(files);
                setValue("designImages", files, { shouldValidate: true });
                //trigger("designImages"); // ← fuerza la validación visual
              }}
              error={errors.designImages}
              accept="image/*"
            />

            {errors.designImages && (
              <span className="form-error">
                Debes subir al menos una imagen de diseño
              </span>
            )}

            <InputSelect
              id="idCategory"
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.nameCategory,
              }))}
              register={register("idCategory", {
                required: "Selecciona una categoría",
              })}
              defaultOptionLabel="Selecciona una categoría"
              error={errors.idCategory}
            />

            <InputSelect
              id="idHolidayProduct"
              options={holidays.map((hol) => ({
                value: hol._id,
                label: hol.nameHoliday,
              }))}
              register={register("idHolidayProduct", {
                required: "Selecciona una festividad",
              })}
              defaultOptionLabel="Selecciona una festividad"
              error={errors.idHolidayProduct}
            />
          </form>
        </Modal>
      )}

      {/* Modal para editar un producto */}
      {showEditModal && (
        <Modal
          title="Editar producto"
          onClose={handleCloseModal}
          actions={<Button onClick={handleSubmit(onSubmit)}>Guardar</Button>}
        >
          <form className="form-edit-generic">
            <Input
              {...register("nameProduct")}
              placeholder="Nombre del producto"
            />
            {errors.nameProduct && (
              <span className="error">{errors.nameProduct.message}</span>
            )}

            <Input
              type="number"
              {...register("price", { min: 0 })}
              placeholder="Precio"
            />
            {errors.price && (
              <span className="error">{errors.price.message}</span>
            )}

            <TextArea
              {...register("description", {
                maxLength: {
                  value: 235,
                  message: "Has alcanzado el límite de 235 caracteres",
                },
                validate: (value) =>
                  !/\n/.test(value) || "No se permiten saltos de línea",
              })}
              placeholder="Descripción"
              id="description"
              maxLength={235}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            {errors.description && (
              <span className="form-error">{errors.description.message}</span>
            )}

            <ImageUploader
              initialPreview={selectedProduct?.image}
              onImageSelect={(file) => {
                setImage(file);
                setValue("image", file, { shouldValidate: true });
              }}
              error={errors.image}
              accept="image/*"
            />

            <MultiImageUploader
              initialImages={selectedProduct?.designImages || []}
              onChange={(files) => {
                setEditDesignImages(files);
                setValue("designImages", files, { shouldValidate: true });
              }}
              error={errors.designImages}
              accept="image/*"
            />

            <InputSelect
              id="idCategory"
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.nameCategory,
              }))}
              register={register("idCategory")}
              defaultOptionLabel="Selecciona una categoría"
              error={errors.idCategory}
            />

            <InputSelect
              id="idHolidayProduct"
              options={holidays.map((hol) => ({
                value: hol._id,
                label: hol.nameHoliday,
              }))}
              register={register("idHolidayProduct")}
              defaultOptionLabel="Selecciona una festividad"
              error={errors.idHolidayProduct}
            />
          </form>
        </Modal>
      )}

      {/* Modal para eliminar un producto */}
      {showDeleteModal && (
        <Modal
          title="Eliminar producto"
          onClose={handleCloseModal}
          actions={
            <>
              <Button onClick={() => handleDelete(selectedProduct?._id)}>
                Eliminar
              </Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </>
          }
        >
          <p>¿Estás seguro de que deseas eliminar este producto?</p>
        </Modal>
      )}

      {/* Modal para crear una categoría */}
      {showCreateCategoryModal && (
        <Modal
          title="Crear nueva categoría"
          onClose={() => setShowCreateCategoryModal(false)}
          actions={
            <Button
              onClick={formCategory.handleSubmit(onSubmitCategory)}
              type="submit"
              form="form-create-category"
            >
              Guardar
            </Button>
          }
        >
          <form
            id="form-create-category"
            onSubmit={formCategory.handleSubmit(onSubmitCategory)}
            className="form-create-category"
          >
            <Input
              {...formCategory.register("nameCategory", {
                required: "El nombre de la categoría es obligatorio",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
              placeholder="Nombre de la categoría"
            />
            {errors.nameCategory && (
              <span className="form-error">{errors.nameCategory.message}</span>
            )}
          </form>
        </Modal>
      )}

      {/* Modal para crear una festividad */}
      {showCreateHolidayModal && (
        <Modal
          title="Crear nueva festividad"
          onClose={() => setShowCreateHolidayModal(false)}
          actions={
            <Button
              onClick={formHoliday.handleSubmit(onSubmitHoliday)}
              type="submit"
              form="form-create-holiday"
            >
              Guardar
            </Button>
          }
        >
          <form
            id="form-create-holiday"
            onSubmit={formHoliday.handleSubmit(onSubmitHoliday)}
            className="form-create-holiday"
          >
            <Input
              {...formHoliday.register("nameHoliday", {
                required: "El nombre de la festividad es obligatorio",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
              placeholder="Nombre de la festividad"
            />
            {errors.nameHoliday && (
              <span className="form-error">{errors.nameHoliday.message}</span>
            )}
          </form>
        </Modal>
      )}

      {/*Cuerpo principal de la página de productos*/}
      <div className="banner-private-container">
        <BannerPrivate
          title="Productos"
          subtitle="Listado de los productos dentro del catálogo"
          mainImage={BannerProduct}
        />
      </div>

      <div className="bandana-container">
        <div className="bandana-header">
          <div className="filter-tags">
            <span
              className="nueva-cate"
              onClick={() => setShowCreateCategoryModal(true)}
            >
              + Agregar Nueva Categoría
            </span>
            <span
              className="nueva-fest"
              onClick={() => setShowCreateHolidayModal(true)}
            >
              + Agregar Nueva Festividad
            </span>
          </div>

          <div className="search-actions">
            <div className="search-container">
              <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                placeholder="Buscar..."
              />
              <SearchIcon className="search-icon" size={20} />
            </div>
            <div className="agregar-btn-prod">
              <AgregarButton onClick={handleOpenCreate} />
            </div>
          </div>
        </div>

        <ListProducts
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
        <Paginacion />
      </div>
    </>
  );
};

export default Products;
