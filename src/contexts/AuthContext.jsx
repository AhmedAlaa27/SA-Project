import { createContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import api from "../api/api";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

export const Status = {
    PENDING: "PENDING",
    LOADING: "LOADING",
    DEFAULT: "DEFAULT",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}

const initalState = {
    user: null,
    status: Status.DEFAULT
}

export const AuthContext = createContext(initalState);

export const authReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "SET_STATUS":
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }
};

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initalState);
    const navigate = useNavigate();

    const setUser = (user) => {
        dispatch({
            type: "SET_USER",
            payload: user
        });
    }

    const setStatus = (status) => {
        dispatch({
            type: "SET_STATUS",
            payload: status
        });
    }

    const loadUser = async () => {
        setStatus(Status.LOADING);

        try {
            const res = await api.get("/user/profile");
            console.log("User => ", res.data);
            setUser(res.data);
            setStatus(Status.SUCCESS)
        } catch (error) {
            setUser(null);
            setStatus(Status.ERROR);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    if (state.status == Status.PENDING) {
        return <Loading />
    }

    const isAuthenticated = () => state.user != null;

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const values = {
        ...state,
        setUser,
        setStatus,
        isAuthenticated,
        logout
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}