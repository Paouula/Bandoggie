import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import useFetchRegister from '../hooks/Login/UseFetchRegister';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        birthday: '',
        dui: '',
        address: ''
    });
    
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
                toast.success("Registration successful");
                reset();
                navigate('/login');
            }
        } catch (error) {
            toast.error("Registration failed. Please check your details.");
        }
    };

    return (
        <div>
        </div>
    );
}

export default Register