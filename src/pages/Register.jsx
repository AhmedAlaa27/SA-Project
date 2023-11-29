import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/api";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ReactLoading from "react-loading";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Invalid email address'),
    password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm({
        resolver: yupResolver(schema)
    });

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await api.post("/auth/register", data);
            setUser(res.data);
            navigate("/login");
        } catch (error) {
            switch (error.response.status) {
                case 409:
                    setError("email", { message: "This email already exists" });
                    break;
                default:
                    setError("root", { message: "Some error happend" });
                    break;
            }
        }
    }

    return (
        <section className="auth">
            <form className="form shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="title">Register</h2>
                {errors.root && <div className="error">{errors.root.message}</div>}
                <div className="form-group">
                    <label htmlFor="">Name *</label>
                    <input {...register("name")} className="form-control" type="text" />
                    {errors.name && <div className="text-danger">{errors.name.message}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="">Email *</label>
                    <input {...register("email")} className="form-control" type="text" />
                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="">Password *</label>
                    <input {...register("password")} className="form-control" type="password" />
                    {errors.password && <div className="text-danger">{errors.password.message}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="">Confirm Password *</label>
                    <input {...register("confirmPassword")} className="form-control" type="password" />
                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary d-flex gap-2" disabled={isSubmitting}>
                    {isSubmitting && <ReactLoading type="spin" width={"20px"} height={"20px"} />}
                    Register
                </button>
                <div className="text-center">
                    <p>Already have an account <Link to={'/login'} className='submit'>Login</Link></p>
                </div>
            </form>
        </section>
    )
}

export default Register;