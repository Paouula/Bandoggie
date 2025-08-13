import React, { useRef, useState, useEffect } from "react";
import "./MultiImageUploader.css";
import Button from "../Button/Button.jsx";
import { RxCross1 } from "react-icons/rx";

const MAX_IMAGES = 3;

const MultiImageUploader = ({
  onImagesSelect,
  initialImages = [],
  buttonLabels = {},
  disabled = false,
  text
}) => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Cargar imágenes iniciales (URLs desde la base de datos)
  useEffect(() => {
    if (initialImages.length > 0) {
      const formatted = initialImages.map((img) => {
        const isFile = img instanceof File;
        return {
          file: img,
          url: isFile ? URL.createObjectURL(img) : img,
        };
      });
      setImages(formatted);
      onImagesSelect?.(formatted.map((img) => img.file));
    }
  }, [initialImages]);

  const handleSelectImages = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const removeAllImages = () => {
    setImages([]);
    onImagesSelect?.([]);
  };

  const handleFiles = (files) => {
    const validImages = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    const remainingSlots = MAX_IMAGES - images.length;
    const newImages = validImages.slice(0, remainingSlots);

    const previews = newImages.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedImages = [...images, ...previews];
    setImages(updatedImages);
    onImagesSelect?.(updatedImages.map((img) => img.file));
  };

  const handleImageChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    e.currentTarget.classList.remove("drag-over");
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    e.currentTarget.classList.remove("drag-over");
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
    onImagesSelect?.(updated.map((img) => img.file));
  };

  const openPreview = (url) => {
    setPreviewImage(url);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <>
      <div
        className={`multi-image-upload-container ${disabled ? "disabled" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          multiple
          style={{ display: "none" }}
          disabled={disabled}
        />

        <div className="upload-zone">
          <div className="multi-image-preview">
            {images.map((img, index) => (
              <div key={index} className="image-card">
                <div className="image-wrapper">
                  {!disabled && (
                    <button
                      type="button"
                      className="remove-icon"
                      onClick={() => removeImage(index)}
                    >
                      <RxCross1 />
                    </button>
                  )}
                  <img
                    src={img.url}
                    alt={`Preview ${index + 1}`}
                    onClick={() => openPreview(img.url)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="image-info">
                  <span>
                    {img.file.name ? img.file.name : "Imagen cargada"}
                  </span>
                  <span>
                    {img.file.size
                      ? `${(img.file.size / 1024).toFixed(1)} KB`
                      : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {images.length < MAX_IMAGES && (
            <Button
              type="button"
              className="add-more-button"
              onClick={handleSelectImages}
              disabled={disabled}
            >
              {isDragging
                ? buttonLabels.drag || "Arrastra tus imágenes aquí"
                : buttonLabels.add || "Agregar imágenes"}
            </Button>
          )}

          {images.length === MAX_IMAGES && !disabled && (
            <Button
              type="button"
              className="add-more-button"
              onClick={removeAllImages}
            >
              Eliminar todas las imágenes
            </Button>
          )}
        </div>
      </div>

      {previewImage && (
        <div className="image-preview-modal" onClick={closePreview}>
          <div
            className="modal-content-image-preview"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-preview" onClick={closePreview}>
              <RxCross1 />
            </button>
            <img
              src={previewImage}
              alt="Vista previa"
              className="preview-image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MultiImageUploader;
