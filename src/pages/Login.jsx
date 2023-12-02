import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import * as yup from "yup";
import "./css/auth.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactLoading from "react-loading";

const schema = yup.object().shape({
    email: yup.string().required("Email is requierd").email(),
    password: yup.string().required("Password is required"),
})

function Login() {
    const {
        register,
        formState: { errors, isSubmitting },
        setError,
        handleSubmit
    } = useForm({
        resolver: yupResolver(schema)
    })

    const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await api.post("/auth/login", data);
            setUser(res.data);
            navigate("/");
        } catch (e) {
            switch (e.response?.status) {
                case 401:
                    setError("root", { message: "Login failed" });
                    break;
                default:
                    setError("root", { message: "Some error happend, try again later" });
                    break;
            }
        }
    }

    return (
        <section className="auth">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="title">Login</h2>
                {errors.root && <p className="error">{errors.root.message}</p>}
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input {...register("email")} className="form-control" />
                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input {...register("password")} className="form-control" type="password" />
                    {errors.password && <div className="text-danger">{errors.password.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary d-flex gap-2" disabled={isSubmitting} >
                    {isSubmitting && <ReactLoading type="spin" width={"20px"} height={"20px"} />}
                    Login
                </button>
                <div className="text-center">
                    <p>Don't have an account <Link to={'/register'} className='submit'>Register</Link></p>
                </div>
            </form>
        </section >
    )
}
export default Login;