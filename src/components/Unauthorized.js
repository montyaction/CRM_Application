import { useNavigate } from "react-router-dom";
import not from "../assets/403.svg";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section className="bg-light vh-100 d-flex justify-content-center align-items-center text-center">
            <div>
                <h1> Unauthorized Access </h1>
                <img src={not} alt="Unauthorized Access" />
                <br />
                <p>You do not have access to the requested page.</p>
                <div className="flexGrow">
                    <button className="btn btn-primary" onClick={()=>goBack()}>Go Back to Previous Page</button>&nbsp;
                </div>
            </div>
        </section>
    )
}
export default Unauthorized;