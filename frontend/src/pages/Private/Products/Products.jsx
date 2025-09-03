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
  const [showCreateModal, setShowCreateModal] = useState(false);
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
  const {
    handleGetProducts,
    handlePostProducts,
    handleDeleteProducts,
    handlePutProducts,
  } = useFetchProducts();

  const { handleGetCategories, handlePostCategory } = useFetchCategory();
  const { handleGetHolidays, handlePostHoliday } = useFetchHolidays();

  // Función para cargar los productos
  const loadProducts = async () => {
    try {
      const data = await handleGetProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los productos");
    }
  };

  // Función para cargar las categorías
  const loadCategories = async () => {
    try {
      const data = await handleGetCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las categorías");
    }
  };

  // Función para cargar las festividades
  const loadHolidays = async () => {
    try {
      const data = await handleGetHolidays();
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

  // Funciones para abrir los modales
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
    // Llenar el formulario con los datos del producto
    reset({
      nameProduct: product.nameProduct || "",
      price: product.price || "",
      description: product.description || "",
      idCategory: product.idCategory?._id || "",
      idHolidayProduct: product.idHolidayProduct?._id || "",
    });
    setImage(product.image || null);
    setEditDesignImages(product.designImages || []);
    setShowEditModal(true);
  };

  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // Función para cerrar todos los modales
  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowCreateModal(false);
    setShowCreateCategoryModal(false);
    setShowCreateHolidayModal(false);
    setSelectedProduct(null);
    reset();
    setImage(null);
    setCreateDesignImages([]);
    setEditDesignImages([]);
  };

  // Función para crear un producto
  const onCreateProduct = async (data) => {
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
      handleCloseModal();
      await loadProducts();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  // Función para editar un producto
  const onEditProduct = async (data) => {
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
      handleCloseModal();
      await loadProducts();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async () => {
    try {
      setLoading(true);
      await handleDeleteProducts(selectedProduct._id);
      handleCloseModal();
      await loadProducts();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  // Funciones para crear categorías y festividades
  const onSubmitCategory = async (data) => {
    if (!data.nameCategory) {
      toast.error("Por favor, ingresa todos los datos.");
      return;
    }
    try {
      const categoryData = {
        nameCategory: data.nameCategory,
      };
      await handlePostCategory(categoryData);
      handleCloseModal();
      await loadCategories();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al crear la categoría");
    }
  };

  const onSubmitHoliday = async (data) => {
    if (!data.nameHoliday) {
      toast.error("Por favor, ingresa todos los datos.");
      return;
    }
    try {
      const holidayData = {
        nameHoliday: data.nameHoliday,
      };
      await handlePostHoliday(holidayData);
      handleCloseModal();
      await loadHolidays();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al crear la festividad");
    }
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

      {/* Modal para crear producto */}
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
              }}
              error={errors.designImages}
              accept="image/*"
            />
            {errors.designImages && (
              <span className="form-error">
                Debes subir al menos 3 imágenes de diseño
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

      {/* Modal para editar producto */}
      {showEditModal && (
        <Modal
          title="Editar producto"
          onClose={handleCloseModal}
          actions={<Button onClick={handleSubmit(onEditProduct)}>Guardar</Button>}
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
              })}
              placeholder="Precio"
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
              accept="image/*"
            />

            <MultiImageUploader
              initialImages={selectedProduct?.designImages || []}
              onChange={(files) => {
                setEditDesignImages(files);
                setValue("designImages", files, { shouldValidate: true });
              }}
              accept="image/*"
            />

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
            />
          </form>
        </Modal>
      )}

      {/* Modal para eliminar producto */}
      {showDeleteModal && (
        <Modal
          title="Eliminar producto"
          onClose={handleCloseModal}
          actions={
            <>
              <Button onClick={handleDelete}>Eliminar</Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </>
          }
        >
          <p>
            ¿Estás seguro de que deseas eliminar el producto{" "}
            <strong>{selectedProduct?.nameProduct}</strong>?
          </p>
        </Modal>
      )}

      {/* Modal para crear categoría */}
      {showCreateCategoryModal && (
        <Modal
          title="Crear nueva categoría"
          onClose={handleCloseModal}
          actions={
            <Button onClick={formCategory.handleSubmit(onSubmitCategory)}>
              Guardar
            </Button>
          }
        >
          <form className="form-create-category">
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
            {formCategory.formState.errors.nameCategory && (
              <span className="form-error">
                {formCategory.formState.errors.nameCategory.message}
              </span>
            )}
          </form>
        </Modal>
      )}

      {/* Modal para crear festividad */}
      {showCreateHolidayModal && (
        <Modal
          title="Crear nueva festividad"
          onClose={handleCloseModal}
          actions={
            <Button onClick={formHoliday.handleSubmit(onSubmitHoliday)}>
              Guardar
            </Button>
          }
        >
          <form className="form-create-holiday">
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
            {formHoliday.formState.errors.nameHoliday && (
              <span className="form-error">
                {formHoliday.formState.errors.nameHoliday.message}
              </span>
            )}
          </form>
        </Modal>
      )}

      {/* Cuerpo principal de la página */}
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