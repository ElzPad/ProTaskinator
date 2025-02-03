import './Page404.css';
import WarningIcon from '../../assets/warningIcon.svg';

export default function Page404() {
  return (
    <div className="page404">
      <div className="container404">
        <img src={WarningIcon} alt="Empty page warning" />
        <div>
          <h1>Oops...</h1>
          <p>Something went wrong. The page was not found.</p>
        </div>
      </div>
    </div>
  );
}
