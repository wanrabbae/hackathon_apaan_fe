import api from ".";

export const login = async (email: string, password: string) => {
    const response = await api.post("/login", {
        email,
        password,
    });
    return response.data;
    };

export const register = async (email: string, password: string, name: string) => {
    const response = await api.post("/register", {
        email,
        password,
        fullname: name,
    });
    return response.data;
    }