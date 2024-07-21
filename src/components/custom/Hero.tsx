import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="flex items-center mx-9 mb-10 lg:mx-56 gap-9 flex-col">
      <img src="/header.avif" className="z-10 mt-5  rounded-xl h-1/2"  alt="" />
      <h1 className="font-extrabold text-[30px] lg:text-[60px] text-center mt-16">
        <span className="text-sky-700">
          Discover Your Next Adventure with AI:{" "}
        </span>{" "}
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button> Get started , It's free </Button>
      </Link>
    </div>
  );
};

export default Hero;
