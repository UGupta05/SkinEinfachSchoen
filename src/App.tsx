import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Leistungen, LeistungenOverview } from './pages/Leistungen';
import { Team } from './pages/Team';
import { Terminbuchung } from './pages/Terminbuchung';
import { Kontakt } from './pages/Kontakt';
import { Shop } from './pages/Shop';
import {
  JetPeel,
  IPLHaarentfernung,
  MesoBBGlow,
  Microneedling,
  BrowLift,
  Wimpernlifting,
  KlassischeKosmetik,
  FruchtsaeurePeeling,
  VisiaHautanalyse,
  MedicalKosmetikZO
} from './pages/Treatments';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leistungen" element={<Leistungen />}>
            <Route index element={<LeistungenOverview />} />
            <Route path="jetpeel" element={<JetPeel />} />
            <Route path="ipl" element={<IPLHaarentfernung />} />
            <Route path="meso-bb-glow" element={<MesoBBGlow />} />
            <Route path="microneedling" element={<Microneedling />} />
            <Route path="brow-lift" element={<BrowLift />} />
            <Route path="wimpernlifting" element={<Wimpernlifting />} />
            <Route path="klassische-kosmetik" element={<KlassischeKosmetik />} />
            <Route path="fruchtsaeure-peeling" element={<FruchtsaeurePeeling />} />
            <Route path="visia" element={<VisiaHautanalyse />} />
          </Route>
          <Route path="/medical-kosmetik-zo" element={<MedicalKosmetikZO />} />
          <Route path="/team" element={<Team />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/terminbuchung" element={<Terminbuchung />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
