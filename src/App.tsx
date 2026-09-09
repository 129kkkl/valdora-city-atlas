import Header from "./components/Header";
import Hero from "./sections/Hero";
import World from "./sections/World";
import CityPlanning from "./sections/CityPlanning";
import Architecture from "./sections/Architecture";
import Landmarks from "./sections/Landmarks";
import Journey from "./sections/Journey";
import Exploration from "./sections/Exploration";
import DayNight from "./sections/DayNight";
import Collection from "./sections/Collection";
import Technology from "./sections/Technology";
import Gallery from "./sections/Gallery";
import Manifesto from "./sections/Manifesto";
export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <World />
        <CityPlanning />
        <Architecture />
        <Landmarks />
        <Journey />
        <Exploration />
        <DayNight />
        <Collection />
        <Technology />
        <Gallery />
        <Manifesto />
      </main>
    </>
  );
}
