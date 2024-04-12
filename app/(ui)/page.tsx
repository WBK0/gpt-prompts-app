import PromptsList from "@components/PromptsList";
import Hero from "./components/Hero/Hero";
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
        <h1 className="text-5xl font-gilroyHeavy text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 drop-shadow p-4 text-center">
          POPULAR PROMPTS
        </h1>
        <PromptsList
          url={`/prompt?max=3&sort=favorites`}
        />
      </div>
    </>
  )
}

export default Home;
