import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components/protectedroutes";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
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
import { Mesrecettes } from "./pages/profile/mesrecettes";
import { Monprofil } from "./pages/profile/myprofile";
import { Homelanding } from "./pages/home/homelanding";
import { NotFound } from "./components/notFound";
import { PrivacyPolicy } from "./components/privacyPolicy";
import { TermsConditions } from "./components/termsConditions";
import { SitePlan } from "./components/sitePlan";

export const App = () => {
  // Loader logo des popotes
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 1000)
  // }, []);
  // if (loading) return <Logo des popotes />
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homelanding />} />
        {/* Home */}
        <Route path="accueil" element={<Home />}>
          <Route path="nouveautes" element={<Lastpubs />}>
            <Route path=":recetteID" element={<Recette />} />
          </Route>
          <Route path="bestof" element={<Bestof />}>
            <Route path=":recetteID" element={<Recette />} />
          </Route>
        </Route>

        {/* La Popote */}
        <Route path="lapopote" element={<Lapopote />}>
          <Route path=":recetteID" element={<Recette />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="creation" element={<Creation />} />
          </Route>
        </Route>

        {/* Les Popotes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="lespopotes" element={<Lespopotes />}>
            <Route path=":popote" element={<Popotes />} />
          </Route>
        </Route>

        {/* Profile */}
        <Route element={<ProtectedRoutes />}>
          <Route path="profil" element={<Profile />}>
            <Route path="monprofil" element={<Monprofil />} />
            <Route path="favorites" element={<Favorites />}>
              <Route path=":recetteID" element={<Recette />} />
            </Route>
            <Route path="mesrecettes" element={<Mesrecettes />}>
              <Route path=":recetteID" element={<Recette />} />
            </Route>
            <Route path="mespopotes" element={<Mespopotes />} />
          </Route>
        </Route>

        {/* Privacy Policy */}
        <Route path="privacypolicy" element={<PrivacyPolicy />} />
        {/* Terms & Conditions */}
        <Route path="termsconditions" element={<TermsConditions />} />
        {/* Plan du site */}
        <Route path="plandusite" element={<SitePlan />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
