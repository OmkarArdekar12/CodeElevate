import { Link } from "react-router-dom";
import { BsEmojiFrownFill } from "react-icons/bs";

export default function NotFound() {
  return (
    <div className="text-white m-9 transition-all duration-200 ease-in-out">
      <h1 className="text-5xl text-red-500 my-6">Oops! Error 404</h1>
      <p className="ml-2 text-2xl">
        Page Not Found! <BsEmojiFrownFill className="text-red-500 inline" />
      </p>
      <p className="ml-2 mb-6 text-xl italic">
        Sorry, Page you are trying to access does not exist!
      </p>
      <Link to="/" className="text-xl text-blue-500 hover:underline">
        Click Here! to Go Back To Home
      </Link>
    </div>
  );
}
