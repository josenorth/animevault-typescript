import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 py-8 px-4">
      <div className="container mx-auto text-center">
        <p className="text-gray-300">&copy; 2024 AnimeVault. All rights reserved.</p>
        <div className="mt-4">
          <Link to="/Terms" className="text-gray-400 hover:text-purple-400 mx-2 transition-colors">Terms of Service</Link>
          <Link to="/Privacy" className="text-gray-400 hover:text-purple-400 mx-2 transition-colors">Privacy Policy</Link>
          <a href="mailto:contact@animevault.com?subject=Inquiry%20About%20AnimeVault" className="text-gray-400 hover:text-purple-400 mx-2 transition-colors">Contact Us</a>
          <Link to="/aboutus" className="text-gray-400 hover:text-purple-400 mx-2 transition-colors">About Us</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
