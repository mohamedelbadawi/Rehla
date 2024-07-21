import { TripDocument } from "@/types/trip";

type Props = { trip: TripDocument };

const InfoSection = ({ trip }: Props) => {
  return (
    <div>
      <img
        src="/travel.jpg"
        className="mt-3 p-2 h-[340px] w-full object-fit rounded-3xl"
        alt=""
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl"> 📍{trip?.userChoice?.destination}</h2>
        <div className="flex gap-2">
          <h2 className="p-1 px-3 bg-gray-300 rounded-full">
            {" "}
            📅 {trip?.userChoice?.days} days
          </h2>
          <h2 className="p-1 px-3 bg-gray-300 rounded-full">
            👥 for {trip?.userChoice?.companion}
          </h2>
          <h2 className="p-1 px-3 bg-gray-300 rounded-full">
            💰 {trip?.userChoice?.budget} Budget
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
