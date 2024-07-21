import { useEffect, useState } from "react";
import { getCurrentUserTrips, isAuth } from "./create-trip/helper";
import { TripDocument } from "./types/trip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const UserTrips = () => {
  const [trips, setTrips] = useState<TripDocument[] | undefined>([]);
  const router = useNavigate();
  useEffect(() => {
    const getTrips = async () => {
      const tripsData = await getCurrentUserTrips();
      setTrips(tripsData);
    };
    if (!isAuth()) {
      router("/");
    }
    getTrips();
  }, []);

  return (
    <div className=" my-10 ">
      <h1 className="text-2xl font-bold text-center mb-10">My Trips ✈️</h1>
      <div className=" lg:px-96 px-5 grid sm:grid-cols-1 lg:grid-cols-6 gap-5">
        {trips?.map((trip) => (
          <Link to={`/trip/${trip.id}`}>
            <Card className="cursor-pointer hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="text-xl">
                  {trip.userChoice?.destination}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  it's a trip tp {trip.userChoice?.destination} for{" "}
                  {trip.userChoice?.days} days with {trip.userChoice?.budget}{" "}
                  budget with {trip.userChoice?.companion}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserTrips;
