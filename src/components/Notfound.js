import { useNavigate } from "react-router-dom";
import not from '../assets/404.svg';

const Notfound = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

  return (
    <section className="bg-light vh-100 d-flex justify-content-center align-items-center text-center">
        <div>
            <h1>Page Not Found</h1>
            <img src={not} alt="Page Not found" />
            <br/>
            <p>Page is not available.</p>
            <div className="flexGrow">
                <button className="btn btn-primary" onClick={()=>goBack()}>Go Back to Previous Page</button>&nbsp;
            </div>
        </div>
    </section>
  )
}
export default Notfound