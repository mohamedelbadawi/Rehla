import { HotelOption, TripDocument } from "@/types/trip";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = { trip: TripDocument };

const Hotels = ({ trip }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hotels, setHotels] = useState<HotelOption[]>([]);
  useEffect(() => {
    if (trip) {
      setLoading(false);
    }
    setHotels(JSON.parse(trip.tripData as string).hotelOptions);
    console.log(hotels);
  }, [trip]);

  return (
    <div>
      <h2 className="text-xl font-semibold">Hotel Recommendations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 px-20 gap-8 ">
          {hotels && hotels.length ? (
            <>
              {hotels.map((hotel: any, index: any) => (
                <Link
                  to={`https://google.com/maps/search/?api=1&query=${
                    hotel.name + " " + hotel.address
                  }`}
                  target="_blank"
                >
                  <div
                    key={index}
                    className="my-4 hover:scale-110 transition-all cursor-pointer p-2 rounded-lg border-2"
                  >
                    {/* <img
                      src="/travel.jpg"
                      className="rounded-xl"
                      alt={hotel.name}
                      defaultValue="/logo.svg"
                    /> */}
                    <div className="my-3 flex flex-col gap-2">
                      <h3 className="text-lg font-medium">{hotel.name}</h3>
                      <p className="text-gray-500 text-sm">📍{hotel.address}</p>
                      <p className="text-sm font-medium">💰 {hotel.price}</p>
                      <p className="text-sm font-medium">
                        ⭐ {hotel.rate} stars
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <p>No hotel recommendations available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Hotels;
