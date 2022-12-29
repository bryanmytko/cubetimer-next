import { Timer } from "../components";

const Home = () => {
  return (
    <div className="container mx-auto bg-gray-800">
      <div className="grid md:grid-cols-6 grid-cols-1">
        <Timer />
      </div>
    </div>
  );
};
export default Home;
