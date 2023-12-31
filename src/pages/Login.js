import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { userSignin, userSignup } from '../api/auth';

export default function Login() {
    const [showSignup, setShowSignup] = useState(false);
    const [message, setMessage] = useState("");

    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userType, setUserType] = useState("CUSTOMER");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const ThrottledNavigation = () => {
        const [isThrottled, setThrottled] = useState(false);

        useEffect(() => {
            if (localStorage.getItem("token")) {
                if (localStorage.getItem("userTypes") === "CUSTOMER")
                    throttleNavigation('/customer');
                else if (localStorage.getItem("userTypes") === "ENGENEER")
                    throttleNavigation('/engineer');
                else
                    throttleNavigation('/admin');
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const throttleNavigation = (path) => {
            if (!isThrottled) {
                setThrottled(true);
                navigate(path);

                // React throttle after 1 second (adjust the delay as needed)
                setTimeout(() => {
                    setThrottled(false);
                }, 1000);
            }
        };

        return null;    // Render null since this component is only for navigation
    };


    const history = useNavigate();

    const loginFn = (e) => {
        const data = {
            userId,
            password: userPassword
        };
        e.preventDefault();
        userSignin(data).then(function (response) {
            if (response.status === 200) {
                console.log(response);
                if (response.data.message) {
                    setError(true)
                    setMessage(response.data.message)

                } else {
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("password", response.data.password);
                    localStorage.setItem("userType", response.data.userType);
                    localStorage.setItem("userStatus", response.data.userStatus);
                    localStorage.setItem('token', response.data.accessToken);
                    if (response.data.userTypes === "CUSTOMER")
                        history('/customer');
                    else if ((response.data.userTypes === "ENGINEER"))
                        history('/engineer');
                    else
                        history('/admin');
                }
            }
            clearState()
        })
        .catch(function (error) {
            setError(true)
            setMessage(error.response.data.message)
        });
    }

    const signupFn = (e) => {
        const data = {
            name: userName,
            userId: userId,
            email: userEmail,
            userType: userType,
            password: userPassword
        };
        e.preventDefault();
        if (userId.length < 5) {
            setError(true)
            setMessage("'User Id' should be of 5 to 10 characters ...")
            return
        }
        else if (userPassword.length < 5 || userPassword.length > 12) {
            setError(true)
            setMessage("'Password' should be 5 to 10 characters ... ")
            return
        }
        else if (userName.length < 5 || userName.length > 12) {
            setError(true)
            setMessage("'User Name' should be 5 to 10 character ...")
            return
        }

        userSignup(data).then(function (response) {
            if (response.status === 201) {
                setShowSignup(false)
                clearState()
                setError(false)
                setMessage("User Signed Up Successfully...")
            }
        })
        .catch(function (error) {
            if (error.response.status === 400) {
                setError(true)
                setMessage(error.response.data.message);
            }
            else {
                console.log(error);
            }
        });
    }

    const updateSignupData = (e) => {
        // setMessage("")
        if (e.target.id === "userId")
            setUserId(e.target.value)
        else if (e.target.id === "password")
            setUserPassword(e.target.value)
        else if (e.target.id === "username")
            setUserName(e.target.value)
        else
            setUserEmail(e.target.value)
    }

    const toggleSignup = () => {
        clearState();
        setShowSignup(!showSignup);
    }

    const handleSelect = (e) => {
        setUserType(e);
    }

    const clearState = () => {
        setMessage("")
        setError(false)
        setUserId("")
        setUserPassword("")
        setUserName("")
        setUserEmail("")
    }


    return (
    <div>
        <div className="bg-primary d-flex justify-content-center align-items-center vh-100">
            <div className={!showSignup ? "card card-signin m-5 p-5" : "card card-signup m-5 p-5"}>
                <div className="row m-2">
                    <div>
                        <h4 className="text-center">{showSignup ? 'Sign up' : 'Login'}</h4>
                        <form onSubmit={ showSignup ? signupFn : loginFn }>
                            <div className="input-group mb-2">
                                <input type="text" className="form-control" placeholder="User Id" id="userId" value={userId} onChange={updateSignupData} autoFocus required />
                            </div>
                            <input type="password" className="form-control" placeholder="Password"  id="password" value={userPassword} onChange={updateSignupData}  required/>
                            
                            {
                                showSignup && <>
                                    <div className="input-group my-2">
                                        <input type="text" className="form-control" placeholder="User Name" id="username" value={userName} onChange={updateSignupData} autoFocus required />
                                    </div>
                                    <div className="input-group mb-2">
                                        <input type="email" className="form-control" placeholder="Email" id="email" value={userEmail} onChange={updateSignupData} autoFocus required />
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <span className="mx-1 my-1">User Type</span>
                                        </div>
                                        <div className="col">
                                            <DropdownButton align="end" title={userType} id="userType" onSelect={handleSelect} variant="light">
                                                <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                                <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                            </DropdownButton>
                                        </div>
                                    </div>
                                </>
                            }

                            <div className="input-group my-2">
                                <input type="submit" className="form-control btn btn-primary" value={showSignup ? "Sign Up" : "Log In"} />
                            </div>
                            <div style={{cursor:'pointer', color:'blue'}} className="text-center" onClick={toggleSignup}>{showSignup ? "Already hava an Account? Log In" : "Don't hava an Account? Sign Up"} </div>
                            <div className={error ? "text-danger text-center" : "text-succes text-center"} >{message}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
