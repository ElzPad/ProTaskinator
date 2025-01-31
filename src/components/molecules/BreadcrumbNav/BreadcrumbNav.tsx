import { useLocation, useNavigate } from 'react-router-dom';
import './BreadcrumbNav.css';

export default function BreadcrumbNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to go back to the previous page
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      {location.pathname != '/' && (
        <div className="routeBar" onClick={handleBackClick}>
          &lt; Go back to previous page
        </div>
      )}
    </>
  );
}
