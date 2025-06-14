
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="pt-32 text-center space-y-8">
      <h1 className="text-8xl font-bold text-gryd-accent lowercase">404</h1>
      <div className="space-y-4">
        <p className="text-2xl">this page doesn't exist</p>
        <p className="text-gryd-soft">probably broke something. happens.</p>
      </div>
      <Link to="/" className="gryd-link text-lg">
        ← go home
      </Link>
    </div>
  );
};

export default NotFound;
