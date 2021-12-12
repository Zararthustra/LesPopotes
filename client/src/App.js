import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components/protectedroutes";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home/home";
import { Bestof } from "./pages/home/bestof";
import { Lastpubs } from "./pages/home/nouveautes";
import { Lapopote } from "./pages/lapopote/lapopote";
import { Creation } from "./pages/lapopote/creation";
import { Recette } from "./pages/lapopote/recette";
import { Lespopotes } from "./pages/lespopotes/lespopotes";
import { Popotes } from "./pages/lespopotes/popotes";
import { Mespopotes } from "./pages/lespopotes/mespopotes";
import { Profile } from "./pages/profile/profile";
import { Favorites } from "./pages/profile/favorites";
import { Creations } from "./pages/profile/creations";
import { Monprofil } from "./pages/profile/myprofile";

export const App = () => {
  // forceRefresh={true}
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />}>
          <Route path="nouveautes" element={<Lastpubs />} />
          <Route path="bestof" element={<Bestof />} />
        </Route>

        {/* La Popote */}
        <Route path="lapopote" element={<Lapopote />}>
          <Route path="recette" element={<Recette /> /* URI param */} />
          <Route element={<ProtectedRoutes />}>
            <Route path="creation" element={<Creation />} />
          </Route>
        </Route>

        {/* Les Popotes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="lespopotes" element={<Lespopotes />}>
            <Route path="popotes" element={<Popotes />} />
          </Route>
        </Route>

        {/* Profile */}
        <Route element={<ProtectedRoutes />}>
          <Route path="profile" element={<Profile />}>
            <Route path="monprofil" element={<Monprofil />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="creations" element={<Creations />} />
            <Route path="mespopotes" element={<Mespopotes />} />
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
