import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bgSoft backdrop-blur-md filter ">
      <h1 className="text-9xl font-bold text-gradient">404 </h1>
      <span> Page Not Found</span>
      <p className="mt-2 text-lg">Sorry, the page youe looking for doesnt exist.</p>
      <Link to="/" className="mt-4 text-primary underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;
