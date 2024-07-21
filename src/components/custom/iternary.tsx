import { Itinerary, TripDocument } from "@/types/trip";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type Props = { trip: TripDocument };

const ItinerarySection = ({ trip }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [itinerary, setItinerary] = useState<Itinerary[]>([]);

  useEffect(() => {
    if (trip) {
      setLoading(false);
      if (JSON.parse(trip.tripData as string).itinerary) {
        setItinerary(JSON.parse(trip.tripData as string).itinerary);
      }
    }
  }, [trip]);

  return (
    <>
      <h1 className="font-bold text-2xl">Itinerary</h1>
      <div className="flex items-center justify-center mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ol className="relative border-l border-orange-200 dark:border-gray-700 mb-4">
            {itinerary.map((item, index) => (
              <li key={index} className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-orange-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-lg font-bold leading-none text-gray-950 dark:text-gray-500">
                  {item.day}
                </time>
                <h3 className="text-lg font-semibold text-gray-500 dark:text-white">
                  {item.bestTimeToVisit}
                </h3>
                {item.plan?.map((plan, planIndex) => (
                  <div key={planIndex}>
                    <h4 className="text-md font-medium text-gray-800 dark:text-gray-300">
                      {plan.name}
                    </h4>
                    <Link
                      to={`https://google.com/maps/search/?api=1&query=${
                        plan.name + " " + trip.userChoice?.destination
                      }`}
                      target="_blank"
                    >
                      <Button variant={"outline"} className="my-2">
                        View 🔗
                      </Button>
                    </Link>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                      {plan.details}
                    </p>
                    <p className="mb-4 text-base font-normal text-gray-900 dark:text-gray-400">
                      {plan.time}
                    </p>
                    <p className="mb-4 text-base font-normal text-gray-900 dark:text-gray-400">
                      {plan.rating} ⭐
                    </p>
                  </div>
                ))}
              </li>
            ))}
            <div className="absolute w-3 h-3 bg-orange-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <h3 className="mx-4 font-bold">END</h3>
          </ol>
        )}
      </div>
    </>
  );
};

export default ItinerarySection;
