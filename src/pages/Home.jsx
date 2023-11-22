import { useRecoilState } from 'recoil';
import '../App.css';
import userState from '../atoms/UserAtom';
function Home() {

    const [ userInfo, setUserInfo ] = useRecoilState(userState);

    return (
        <div className="home">
            <div className="container">
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Welcome {userInfo.username} to our inventory.
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
    );
}

export default Home;