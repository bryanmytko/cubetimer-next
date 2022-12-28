import { Timer } from "../components";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-6 grid-cols-1 md:gap-4">
        <Timer />
      </div>
    </div>
  );
};
export default Home;
