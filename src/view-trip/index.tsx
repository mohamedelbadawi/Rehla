import Hotels from "@/components/custom/Hotels";
import InfoSection from "@/components/custom/InfoSection";
import ItinerarySection from "@/components/custom/iternary";
import { getAuthUserData, getDocument, isAuth } from "@/create-trip/helper";
import { TripDocument } from "@/types/trip";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewTrip = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [trip, setTrip] = useState<TripDocument | null>(null);
  const { id } = useParams();

  const getTrip = async () => {
    return (await getDocument("trips", id as string)) as TripDocument;
  };
  const router = useNavigate();
  useEffect(() => {
    const getTripData = async () => {
      setLoading(true);
      const tripData = await getTrip();
      setTrip(tripData);
      setLoading(false);
      const user = getAuthUserData();
      if (trip?.user?.email != user?.email || !isAuth()) {
        router("/");
        console.log(trip, user?.email);
      }
    };
    getTripData();
  }, [id]);

  return (
    <div className="px-8">
      {loading ? (
        <p>Loading...</p>
      ) : (
        trip && (
          <>
            <InfoSection trip={trip} />
            <Hotels trip={trip} />
            <ItinerarySection trip={trip} />
          </>
        )
      )}
    </div>
  );
};

export default ViewTrip;
