import { GoogleAnalytics } from "nextjs-google-analytics";

import { Timer } from "../components";

const Home = () => {
  return (
    <div className="grid md:grid-cols-6 grid-cols-1">
      <GoogleAnalytics trackPageViews />
      <Timer />
    </div>
  );
};

export default Home;
