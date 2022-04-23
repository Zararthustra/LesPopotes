import { useNavigate } from "react-router-dom";

export const SitePlan = () => {
  const navigate = useNavigate()
  
  return (
    <main className="privacyPolicy">
      <h1 className="simpleLink" onClick={() => navigate("/accueil")}>Accueil</h1>
      <h2 className="simpleLink" onClick={() => navigate("/accueil")}>Accueil</h2>
      <h2 className="simpleLink" onClick={() => navigate("/accueil/bestof")}>Les mieux notées</h2>
      <h2 className="simpleLink" onClick={() => navigate("/accueil/nouveautes")}>Nouveautés</h2>
      <h1 className="simpleLink" onClick={() => navigate("/lapopote")}>La Popote</h1>
      <h2 className="simpleLink" onClick={() => navigate("/lapopote/creation")}>Proposer une recette</h2>
      <h1 className="simpleLink" onClick={() => navigate("/lespopotes")}>Les Popotes</h1>
      <h2 className="simpleLink" onClick={() => navigate("/lespopotes")}>Les Popotes</h2>
      <h2 className="simpleLink" onClick={() => navigate("/lespopotes/forum")}>Forum</h2>
      <h1 className="simpleLink" onClick={() => navigate("/profil")}>Profil</h1>
      <h2 className="simpleLink" onClick={() => navigate("/profil")}>Mon Profil</h2>
      <h2 className="simpleLink" onClick={() => navigate("/profil/mespopotes")}>Mes Popotes</h2>
      <h2 className="simpleLink" onClick={() => navigate("/profil/mesrecettes")}>Mes Recettes</h2>
      <h2 className="simpleLink" onClick={() => navigate("/profil/favorites")}>Mes Favoris</h2>
    </main>
  );
};
