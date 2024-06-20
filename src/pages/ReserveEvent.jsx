import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PresentationForm from "../components/PresentationForm";
import { useAuth } from '../contexts/authContext';
import "../Style/Pages.css";

function ReserveEvent() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <br></br>
      <label className="page-tittle">Reserve</label>
      <PresentationForm />
    </>
  );
}

export default ReserveEvent;