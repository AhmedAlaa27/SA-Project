import { useRecoilState } from 'recoil';
import '../App.css';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
function Home() {
    const { user } = useContext(AuthContext);

    return (
        <Layout>
            <div className="home">
                <div className="container">
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        Welcome "{user?.name}" to our inventory
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <div className="card">
                        <div className="box-header">
                            <h1>This is your new home page!</h1>
                        </div>
                        <div className="box-text">
                            Just browes around and find what pages you can access.
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;