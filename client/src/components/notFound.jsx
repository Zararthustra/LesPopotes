import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="notFound" onClick={() => navigate('/lapopote')}>
      <img src="https://avatars.dicebear.com/api/big-smile/random404......svg?translateY=10" alt="avatar" className="avatarNotFound" />
      <h1 className="zindex">On s'est perdu ?</h1>
      <p className="infinite404">{"404 ".repeat(500)}</p>
    </main>
  );
};
