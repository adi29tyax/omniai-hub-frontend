import { api } from "./api";

export async function registerUser(data: any) {
    return api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
    });
}

export async function loginUser(data: any) {
    return api.post("/auth/login", {
        email: data.email,
        password: data.password,
    });
}
