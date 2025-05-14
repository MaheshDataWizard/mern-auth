import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-400 to-green-600 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <img src={assets.logo} alt="Grambajaar Logo" className="w-32" />
          <div className="flex items-center space-x-6">
            <a href="#hero" className="text-white hover:text-gray-200">Home</a>
            <a href="#kits" className="text-white hover:text-gray-200">Kits</a>
            <a href="#contact" className="text-white hover:text-gray-200">Contact</a>
            <button onClick={() => navigate("/login")} className="text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600">Login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="flex items-center justify-center bg-cover bg-center h-screen" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Fresh, Local Produce Delivered to Your Doorstep</h1>
          <p className="text-lg mb-6">Order pre-packaged vegetable kits online for quick delivery in your area</p>
          <button onClick={() => navigate("/shop")} className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition duration-300">Shop Now</button>
        </div>
      </section>

      {/* Kits Section */}
      <section id="kits" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4">Our Popular Kits</h2>
          <p className="text-xl text-gray-600">Freshly sourced ingredients, packaged for your convenience.</p>
        </div>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <img src="/path-to-image.jpg" alt="Veg Kit" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Vegetable Kit</h3>
            <p className="text-gray-600 mb-4">A perfect selection of seasonal veggies for your family.</p>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">Order Now</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <img src="/path-to-image.jpg" alt="Fruit Kit" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fruit Kit</h3>
            <p className="text-gray-600 mb-4">A handpicked selection of the freshest fruits for you.</p>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">Order Now</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <img src="/path-to-image.jpg" alt="Mixed Kit" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mixed Kit</h3>
            <p className="text-gray-600 mb-4">The best of both fruits and veggies in one convenient package.</p>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">Order Now</button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-xl mb-6">Have any questions or want to know more about our kits? We're here to help.</p>
          <form className="max-w-lg mx-auto">
            <input type="text" placeholder="Your Name" className="w-full p-3 mb-4 rounded-md text-gray-700" />
            <input type="email" placeholder="Your Email" className="w-full p-3 mb-4 rounded-md text-gray-700" />
            <textarea placeholder="Your Message" rows="4" className="w-full p-3 mb-4 rounded-md text-gray-700"></textarea>
            <button className="w-full bg-white text-green-600 px-6 py-3 rounded-full hover:bg-green-100">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2025 Grambajaar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
