import { useNavigate } from "react-router";

const Landing = () => {
    const navigate = useNavigate();
    return (<div className="min-h-screen bg-black text-white">
        <div className="bg-black">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 bg-black border-b border-gray-800 sticky top-0 z-10">
                <div className="text-4xl font-bold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        BlogNest
                    </span>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 text-white border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
                    onClick={() => {
                        navigate("/signin")
                    }}
                    >Sign In</button>
                    <button className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg cursor-pointer"
                    onClick={() => {
                        navigate("/signup")
                    }}
                    >Get Started</button>
                </div>
            </nav>

            {/* Hero Section */}
            <div 
                className="relative h-[650px] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
            >
                <div className="absolute inset-0 bg-black/75">
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold">"Go to place for all Bloggers & Writers."</h1>
                    <p className="mt-4 text-xl"></p>
                    <button className="px-10 py-4 mt-8 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-xl cursor-pointer"
                    onClick={() => {
                        navigate("/signup")
                    }}
                    >Start Reading</button>
                </div>
        </div>
        </div>
        </div>
    );
}

export default Landing;