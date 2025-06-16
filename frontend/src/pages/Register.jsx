import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import useFetchRegister from '../hooks/Register/UseFetchRegister';
import InputComponent from '../components/Input';
import Button from '../components/Button';
import ImageLoader from '../components/ImageLoader/ImageLoader';
import logo from "../img/NavBar/LogoBandoggie.png";
import "../assets/styles/Register.css";

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [profileImage, setProfileImage] = useState(null);

    const { handleRegister } = useFetchRegister();

    const onSubmit = async (data) => {
        try {
            const response = await handleRegister(
                data.name,
                data.lastname,
                data.email,
                data.password,
                data.birthday,
                data.dui,
                data.address
            );
            if (response) {
                toast.success("Registro exitoso");
                reset();
                navigate('/login');
            }
        } catch (error) {
            toast.error("Registro fallido. Verifica tus datos.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-logo" style={{ marginBottom: 10 }}>
                <img src={logo} alt="Huellitas" />
            </div>
            <h2 className="register-title">REGISTRO</h2>
            <span className="register-small-link">¿Ya tiene una cuenta?</span>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="register-profile-image-container">
                    <ImageLoader onImageChange={setProfileImage} />
                </div>
                <div className="register-input-group">
                    <InputComponent
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        register={register('name', { required: true })}
                        className="register-input"
                    />
                </div>
                <div className="register-input-group">
                    <InputComponent
                        type="text"
                        id="lastname"
                        placeholder="Apellido"
                        register={register('lastname', { required: true })}
                        className="register-input"
                    />
                </div>
                <div className="register-input-group">
                    <InputComponent
                        type="email"
                        id="email"
                        placeholder="Correo Electrónico"
                        register={register('email', { required: true })}
                        className="register-input"
                    />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div className="register-input-group" style={{ flex: 1 }}>
                        <InputComponent
                            type="date"
                            id="birthday"
                            placeholder="Fecha de nacimiento"
                            register={register('birthday', { required: true })}
                            className="register-input"
                        />
                    </div>
                    <div className="register-input-group" style={{ flex: 1 }}>
                        <InputComponent
                            type="text"
                            id="dui"
                            placeholder="DUI"
                            register={register('dui', { required: true })}
                            className="register-input"
                        />
                    </div>
                </div>
                <div className="register-input-group">
                    <InputComponent
                        type="text"
                        id="address"
                        placeholder="Dirección"
                        register={register('address', { required: true })}
                        className="register-input"
                    />
                </div>
                <div className="register-input-group">
                    <InputComponent
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        register={register('password', { required: true })}
                        className="register-input"
                    />
                </div>
                <div className="register-forgot">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
                <Button type="submit" className="register-button">Registrar</Button>
            </form>
            <div className="register-decoration"></div>
        </div>
    );
}

export default Register;