import React from "react";
import "react-datepicker/dist/react-datepicker.css";

const SearchBooks = ({
                         searchTitle,
                         setSearchTitle,
                         searchCategory,
                         setSearchCategory,
                     }) => {
    return (
        <div className="row mt-3">
            <div className="col-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm theo tên sách"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </div>
            <div className="col-3">
                <select
                    className="form-control"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                >
                    <option value="">Tìm theo thể loại</option>
                    <option value="Trinh tham">Trinh tham</option>
                    <option value="Tieu thuyet">Tieu thuyet</option>
                    <option value="Kinh di">Kinh di</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBooks;
