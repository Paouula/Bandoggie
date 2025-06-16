import React, { useRef, useState } from 'react';
import './ImageLoader.css';

const ImageLoader = ({ onImageChange }) => {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                if (onImageChange) onImageChange(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="image-upload-container">
            {!image ? (
                <>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        className="select-image-button"
                        type="button"
                        onClick={handleButtonClick}
                    >
                        Seleccionar imagen
                    </button>
                </>
            ) : (
                <div className="image-preview">
                    <img src={image} alt="Preview" />
                    <button
                        className="change-image-button"
                        type="button"
                        onClick={handleButtonClick}
                    >
                        Cambiar imagen
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageLoader;