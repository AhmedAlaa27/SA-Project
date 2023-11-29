import { faGrip, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import UserRole from "../atoms/UserRole";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "../components/Layout";
import api from "../api/api";

function Categories() {

    const [userRole, setUserRole] = useRecoilState(UserRole);

    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const res = await api.get('/category/list');
            setCategories(res.data);
        } catch(e) {
            console.log(e);
        }
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
        })
    };

    const [ catName, setCatName ] = useState('');

    const addCat = async () => {
        try {
            const res = await api.post('/category/create', {
                name: catName
            });
            getCategories();
            console.log(res.data);
        } catch(e) {
            switch(e.respose?.status) {
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
                        (userRole == 'admin'
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
                    {
                        (userRole == 'admin' ||
                            userRole == 'special' ||
                            userRole == 'user'
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
                                                (userRole == 'admin' ||
                                                    userRole == 'special')
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
                                                        (userRole == 'admin')
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