import React, {useCallback, useEffect, useState} from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import { getAllBooks} from "../service/BookService";
import SearchBooks from "./SearchBooks";

function Book() {
    const [books, setBooks] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    const getAllBook = useCallback(async () => {
        try {
            const list = await getAllBooks();
            setBooks(list);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        getAllBook();
    }, [getAllBook]);

    const formatDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
    };

    const filteredBooks = books.filter((book) => {
        return (
            (searchTitle === "" ||
                book.name.toLowerCase().includes(searchTitle.toLowerCase())) &&
            (searchCategory === "" || book.category.name === searchCategory)
        );
    });

    if(!books){
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-12">
                        <h2>Quản lý sách</h2>
                    </div>
                </div>
                <Link
                    to={`/create`}
                    className={"btn btn-success m-3"}
                >
                    Thêm mới sản phẩm
                </Link>

                <SearchBooks
                    searchTitle={searchTitle}
                    setSearchTitle={setSearchTitle}
                    searchCategory={searchCategory}
                    setSearchCategory={setSearchCategory}
                />

                <div className="row mt-3">
                    <div className="col-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã sách</th>
                                <th scope="col">Tên sách</th>
                                <th scope="col">Thể loại</th>
                                <th scope="col">Ngày nhập</th>
                                <th scope="col">số lượng</th>
                                <th scope="col">mô tả thê loại</th>
                                <th scope="col">Hành động</th>

                            </tr>
                            </thead>
                            <tbody>
                            {filteredBooks
                                .map((book, index) => (
                                    <tr key={book.id}>
                                        <td>{index + 1 }</td>
                                        <td>{book.code}</td>
                                        <td>{book.name}</td>
                                        <td>{book.category.name}</td>
                                        <td>{formatDate(book.date)}</td>
                                        <td>{book.quantity}</td>
                                        <td>{book.desc}</td>
                                        <td>
                                            <Link
                                                to={``}
                                                className={"btn btn-warning"}
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                to={``}
                                                className={"btn btn-primary"}
                                            >
                                                Detail
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Book;
