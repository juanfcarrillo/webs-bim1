import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to PetVet</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Schedule an Appointment</h2>
                    <p className="text-gray-600 mb-4">
                        Book a visit with our experienced veterinarians for your pet's health needs.
                    </p>
                    <Link
                        to="/appointments"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                    >
                        Book Now
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Chat with a Vet</h2>
                    <p className="text-gray-600 mb-4">
                        Have questions? Chat with our veterinary team for quick assistance.
                    </p>
                    <Link
                        to="/chat"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                    >
                        Start Chat
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;