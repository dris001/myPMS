import React, {useState} from "react";

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous errors

    if(!isValidEmail(email)) {
        setErrorMessage('Please enter a valid email address.');
        alert('Please enter a valid email address.');
        return;
    }
    if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        alert('Password must be at least 6 characters long.');
        return;
    }
    if(!email || !password) {
        setErrorMessage('Please fill in all fields.');
        return;
    }
    // if(!password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[0-9]/)) {
    //     setErrorMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
    //     return;
    // }
    if(!password){
        setErrorMessage('Please enter your password.');
        return;
    }
    alert('Login successful!');
  };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                type = "password"
                id="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />
            </div>
            <button type = "submit">Login</button>
        </form>
    );
}