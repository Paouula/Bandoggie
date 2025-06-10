import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import useFetchLogin from '../hooks/Login/UseFetchLogin';

const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm();
    const { handleLogin } = useFetchLogin();

    const onSubmit = async (data) => {
        try {
            const response = await handleLogin(data.email, data.password);
            if (response) {
                toast.success("Login successful");
                reset();
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    return(
        <div>

        </div>
    )
}

export default Login;

