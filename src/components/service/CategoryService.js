import axios from "axios";

export const getAll = async () => {
    try {
        const res = await axios.get("http://localhost:8080/category");
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
