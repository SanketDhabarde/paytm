import { Link } from "react-router-dom";

interface ButtonWarningProps {
  label: string;
  buttonText: string;
  to: string;
}
function ButtonWarning({ label, buttonText, to }: ButtonWarningProps) {
  return (
    <div className="text-center">
      {label}
      <Link to={to} className="underline mx-1">
        {buttonText}
      </Link>
    </div>
  );
}

export default ButtonWarning;
