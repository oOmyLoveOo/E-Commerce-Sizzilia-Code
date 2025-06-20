import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import lyrics from "../assets/img/Lyrics.jpg";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-white shadow-top border-t border-gray-200">
      <div className="flex flex-col items-center py-6 md:flex-row justify-between px-4 sm:px-8 md:px-16 lg:px-36 gap-8 md:gap-16">
        <div className="flex flex-col gap-3">
          <p className="font-bold">Info</p>
          <Link to="/Policies" className="underline">
            Politica de uso y devolucion
          </Link>
          <Link to="/Policies" className="underline">
            Politica de privacidad
          </Link>
          <Link to="/Policies" className="underline">
            Metodo de pago y envio
          </Link>
        </div>

        <img
          src={lyrics}
          alt="Sizzilia Code lyrics"
          className="w-48 h-24 sm:w-60 sm:h-28 md:w-74 md:h-32 md:-ml-12"
        />

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row gap-4 sm:gap-6">
            <SocialIcon url="https://www.instagram.com/sizziliacode_/" target="_blank" rel="noopener noreferrer" />
            <Link to="/contact">
              <SocialIcon url="mailto" />
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <CiLocationOn />
            <p className="text-sm sm:text-base">Las Palmas, Gran Canarias</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-4 font-bold border-t border-gray-200">
        <h1 className="text-sm sm:text-base">Copyright © 2025 Sizzilia Code</h1>
      </div>
    </footer>
  );
};

export default Footer;