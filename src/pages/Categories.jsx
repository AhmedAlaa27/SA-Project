import { faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "../components/Layout";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";

function Categories() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        setLoading(true);
        try {
            const res = await api.get('/category/list');
            setCategories(res.data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        getCategories();
    }, []);

    const deleteCat = (cat) => {
        Swal.fire({
            title: `You sure you want to Delete\nCategory: "${cat.name}"?`,
            showCancelButton: true
        }).then((data) => {
            if (data.isConfirmed) {
                api.delete(`/category/delete/${cat.id}`)
                    .then(() => getCategories())
            }
        });
    };

    const [catName, setCatName] = useState('');

    const addCat = async () => {
        try {
            const res = await api.post('/category/create', {
                name: catName
            });
            getCategories();
            console.log(res.data);
        } catch (e) {
            switch (e.respose?.status) {
                case 400:
                    alert('Please, Enter Valid Data');
                    break;
                default:
                    alert('Some Error Has Happend, Try Again Later');
                    break;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCatName('');
        addCat();
    }

    return (
        <Layout>
            <div className="categories">
                <div className="container">
                    {
                        (user?.role == 'ADMIN'
                        )
                        &&
                        <div className="card card-1">
                            <div className="card-header">
                                <FontAwesomeIcon className="icon" icon={faGrip} />
                                <h4>Add New Category</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <input value={catName} required onChange={(e) => setCatName(e.target.value)} type="text" className="form-control" placeholder="Category Name" aria-label="Username" aria-describedby="basic-addon1" />
                                    <button type="submit" className="btn btn-secondary w-25 btn-sm">Add Category</button>
                                </form>
                            </div>
                        </div>
                    }
                    {loading ?
                        <Loading />
                        :
                        (user?.role == 'ADMIN' ||
                            user?.role == 'SPECIAL' ||
                            user?.role == 'USER'
                        )
                        &&
                        <div className="card card-2">
                            <div className="card-header">
                                <FontAwesomeIcon className="icon" icon={faGrip} />
                                <h4>All Categories</h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="col-1">#</th>
                                            <th className="col-9">Categories</th>
                                            {
                                                (user?.role == 'ADMIN' ||
                                                    user?.role == 'SPECIAL')
                                                &&
                                                <th className="col-2">Actions</th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categories.map((cat) => {
                                                return (
                                                    <tr key={cat?.id}>
                                                        <th> {cat?.id} </th>
                                                        <td> {cat?.name} </td>
                                                        {
                                                            (user?.role == 'ADMIN')
                                                            &&
                                                            <td className="actions">
                                                                <Link to={`/Categories/manage/edit/${cat.id}`} className="btn btn-warning btn-sm">
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </Link>
                                                                <button onClick={() => deleteCat(cat)} className="btn btn-danger btn-sm">
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    );
}

export default Categories;