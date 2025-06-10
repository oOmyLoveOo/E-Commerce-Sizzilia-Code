import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import lyrics from "../assets/img/Lyrics.jpg";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-white shadow-top border-t border-gray-200">
      <div className="flex flex-col items-center py-6 md:flex-row justify-between px-36 gap-16">
        <div className="flex flex-col gap-3">
          <p className="font-bold">Info</p>
          <Link to="" className="underline">
            Politica de uso y devolucion
          </Link>
          <Link to="" className="underline">
            Politica de privacidad
          </Link>
          <Link to="" className="underline">
            Metodo de pago y envio
          </Link>
        </div>

        <img
          src={lyrics}
          alt="Sizzilia Code lyrics"
          className="w-74 h-32 md:-ml-12"
        />

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row gap-6">
            <SocialIcon url="https://instagram.com" />
            <SocialIcon url="mailto:info@sizziliacode.com" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <CiLocationOn />
            <p>Las Palmas, Gran Canarias</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-4 font-bold border-t border-gray-200">
        <h1>Copyright © 2025 Sizzilia Code</h1>
      </div>
    </footer>
  );
};

export default Footer;
