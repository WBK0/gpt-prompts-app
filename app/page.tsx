import Hero from "./components/Hero/Hero";
import Searchbar from "./components/Searchbar/Searchbar";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-wrap flex-col">
      <Hero />
      <Searchbar />
    </div> 
  )
}

export default Home;
