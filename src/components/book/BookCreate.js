import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import * as CategoryService from "../service/CategoryService"
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup"
import "../statics/kcustom.css"
import * as BookService from "../service/BookService"
import {toast} from "react-toastify";

export function BookCreate() {
    const [categories, setCategories] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        getAllCategory();
    }, []);

    const getAllCategory = async () => {
        try {
            const list = await CategoryService.getAll();
            setCategories(list);
        } catch (e) {
            console.log(e);
        }
    }

    const validation = {
        code: Yup.string().required("Vui lòng nhập mã sách").matches(/^BO-[0-9]{4}$/, "Mã sách phải đúng định dạng BO-XXXX"),
        name: Yup.string().required("Vui lòng nhập tên sách").max(100, "Tên sách không dài quá 100 ký tự"),
        quantity: Yup.number().required("Vui lòng nhập số lượng").min(0, "Vui lòng nhập số dương").integer("Vui lòng nhập số nguyên")
    }


    const handleSubmit = async (value) => {
        const newValue = {...value, category: JSON.parse(value.category)}
        console.log(newValue);
        await BookService.createBook(newValue);
        navigation("/");
        toast.success("Thêm mới thành công");
    }

    if (!categories) {
        return (<div>Loading...</div>)
    }

    return (
        <>
            <div className="d-flex justify-content-center row ">
                <h2 className="col-12 d-flex justify-content-center mt-5 mb-3">Thêm mới Sách</h2>
            </div>
            <div className="d-flex justify-content-center row mb-5">
                <div className="col-5">
                    <Formik initialValues={{
                        "code": "",
                        "name": "",
                        "date": "",
                        "desc": "",
                        "quantity":""
                    }} onSubmit={handleSubmit} validationSchema={Yup.object(validation)}>
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="kk1" className="form-label">Mã sách</label>
                                <Field name="code" type="text" className="form-control" id="kk1"/>
                                <ErrorMessage name="code" component="span" className="k-span"></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk2" className="form-label">Tên sách</label>
                                <Field name="name" type="text" className="form-control" id="kk2"/>
                                <ErrorMessage name="name" component="span" className="k-span"></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk3" className="form-label">Thể loại</label>
                                <Field name="category" as="select" className="form-control" id="kk3" required>
                                    <option value="" selected disabled>Chọn thể loại</option>
                                    {
                                        categories.map(category => (
                                            <option key={category.id}
                                                    value={JSON.stringify(category)}>{category.name}</option>
                                        ))
                                    }
                                </Field>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk6" className="form-label">mổ tả thê loại</label>
                                <Field name="desc" type="text" className="form-control" id="kk6"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk4" className="form-label">Ngày nhập sách</label>
                                <Field name="date" type="date" className="form-control" id="kk4"/>
                                <ErrorMessage name="date" component="span" className="k-span"></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kk5" className="form-label">Số lượng sách</label>
                                <Field name="quantity" type="number" className="form-control" id="kk5"/>
                                <ErrorMessage name="quantity" component="span" className="k-span"></ErrorMessage>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-success" type="submit">Thêm mới</button>
                                <Link to={"/"} className="btn btn-danger">Hủy</Link>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>

        </>
    )
}