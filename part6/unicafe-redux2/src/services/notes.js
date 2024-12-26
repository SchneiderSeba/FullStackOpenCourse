import axios from "axios";

export const baseUrl = "http://localhost:3001/notes";

export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
    }