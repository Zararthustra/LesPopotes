import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components/protectedroutes";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home/home";
import { Lapopote } from "./pages/lapopote/lapopote";
import { Creation } from "./pages/lapopote/creation";
import { Recettes } from "./pages/lapopote/recettes";
import { Recette } from "./pages/lapopote/recette";
import { Lespopotes } from "./pages/lespopotes/lespopotes";
import { Popote } from "./pages/lespopotes/popote";
import { MesPopotes } from "./pages/lespopotes/mespopotes";
import { Profile } from "./pages/profile/profile";
import { Favorites } from "./pages/profile/favorites";
import { Creations } from "./pages/profile/creations";

export const App = () => {
  // forceRefresh={true}
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* La Popote */}
        <Route path="lapopote" element={<Lapopote />}>
          <Route path="recettes" element={<Recettes />} />
          <Route path="recette" element={<Recette />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="creation" element={<Creation />} />
          </Route>
        </Route>

        {/* Les Popotes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="lespopotes" element={<Lespopotes />}>
            <Route path="mespopotes" element={<MesPopotes />} />
            <Route path="popote" element={<Popote />} />
          </Route>
        </Route>

        {/* Profile */}
        <Route element={<ProtectedRoutes />}>
          <Route path="profile" element={<Profile />}>
            <Route path="favorites" element={<Favorites />} />
            <Route path="creations" element={<Creations />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <h1 style={{ overflowWrap: "anywhere" }}>{"40".repeat(999)}</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
