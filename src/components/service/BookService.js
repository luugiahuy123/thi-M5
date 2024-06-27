import axios from "axios";

export const getAllBooks = async (search = "", category = "" ) => {
    try {
        const res = await axios.get(`http://localhost:8080/book?_sort=quantity&_order=asc`, {
            params: {
                name_like: search,
                "category.name_like": category
            }
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};


export const createBook = async (book) => {
    try {
        const res = await axios.post("http://localhost:8080/book", book);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
