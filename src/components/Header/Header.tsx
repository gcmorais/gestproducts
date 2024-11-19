import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

interface HeaderProps {
  text: string;
  description: string;
  linkTo: string;
}

export default function Header({ text, description, linkTo }: HeaderProps) {
  return (
    <header className="flex justify-center items-center flex-col p-4">
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-20 w-auto" />
        <div>
          <h3 className="text-[#1F2B5D] text-2xl font-bold">gestProducts</h3>
          <p className="text-sm text-gray-600">Products Management</p>
        </div>
      </div>
      <div className="text-center text-sm mt-4">
        {text}{" "}
        <strong className="text-blue-500 cursor-pointer">
          <Link to={linkTo}>{description}</Link>
        </strong>
      </div>
    </header>
  );
}
