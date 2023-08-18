import Hero from "./components/Hero/Hero";
import Prompts from "./components/Prompts/Prompts";
import Searchbar from "./components/Searchbar/Searchbar";

// Home component - displays the home page
const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-wrap flex-col h-screen">
        <Hero />
        <Searchbar />
      </div> 
      <div>
        <Prompts />
      </div>
    </>
  )
}

export default Home;
