import React, { useRef, useState, useEffect } from 'react';
import './imageUploader.css';
import Button from '../Button/Button.jsx';

const ImageUploader = ({
  onImageSelect,
  initialPreview = null,
  buttonLabels = {},
  disabled = false,
}) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(initialPreview);
  const [isDragging, setIsDragging] = useState(false); // 👈 Estado de arrastre

  useEffect(() => {
    setPreviewUrl(initialPreview);
  }, [initialPreview]);

  const handleSelectImage = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelect?.(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    e.currentTarget.classList.remove('drag-over');

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelect?.(file);
    }
  };

  return (
    <div
      className={`image-upload-container ${disabled ? 'disabled' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/jpeg, image/png, image/jpg"
        style={{ display: 'none' }}
        disabled={disabled}
      />

      <div className="upload-zone">
        {previewUrl ? (
          <div className="image-preview">
            <img src={previewUrl} alt="Vista previa" />
            {!disabled && (
              <Button
                type="button"
                className="change-image-button"
                onClick={handleSelectImage}
              >
                {isDragging
                  ? buttonLabels.drag || 'Arrastra el archivo aquí'
                  : buttonLabels.change || 'Cambiar imagen'}
              </Button>
            )}
          </div>
        ) : (
          <Button
            type="button"
            className="select-image-button"
            onClick={handleSelectImage}
            disabled={disabled}
          >
            {isDragging
              ? buttonLabels.drag || 'Arrastra el archivo aquí'
              : buttonLabels.select || 'Selecciona un archivo'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
