import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3000/api/v1/blog/me",{withCredentials: true}).then((res) => {
        console.log(res);
        navigate("/dashboard");
      }).catch((err) => {
        console.log(err);
      })
    }, [])

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/v1/user/signup", {
            name,
            email,
            password
        },{withCredentials: true}).then((res) => {
            console.log(res);
            alert("Successfully Signed Up")
            navigate("/dashboard");
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <div className="min-h-screen flex bg-black text-white">
            {/* Left half: Image and Quote */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1604933762023-7213af7ff7a7?q=80&w=1171&auto=format&fit=crop"
                    alt="Creative workspace"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                           "Rome wasn't built in a day, and neither are great blogs."
                        </h2>
                    </div>
                </div>
            </div>

            {/* Right half: Sign-up Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                BlogNest
                            </span>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-300">
                            Join our community of writers.
                        </h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleSignup}>
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Your name"
                                className="block w-full px-4 py-3 border rounded-lg bg-gray-900 border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                                className="block w-full px-4 py-3 border rounded-lg bg-gray-900 border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                className="block w-full px-4 py-3 border rounded-lg bg-gray-900 border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center text-gray-400">
                        Already have an account?{" "}
                        <Link to="/signin"
                            className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
