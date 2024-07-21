import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { budgets, travelCompanions } from "@/constants/options";
import { useState } from "react";
import { isAuth, saveTrip, tripData, validate } from "./helper";
import { toast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/custom/Spinner";
import { getResult } from "@/services/AiModel";
import { TripDocument } from "@/types/trip";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [formData, setFormData] = useState<tripData>({
    destination: "",
    companion: "",
    budget: "",
    days: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useNavigate();
  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const submitData = async () => {
    if (!isAuth()) {
      toast({
        variant: "destructive",
        description: "You need to sign in first !!",
      });
      return;
    }

    setLoading(true);
    const errors = validate(formData);
    if (errors.length > 0) {
      errors.forEach((err) => {
        toast({
          variant: "destructive",
          title: err,
        });
      });
      setLoading(false);
      return;
    }

    try {
      const result = await getResult(formData);
      if (result?.response?.candidates) {
        const docId: string = await saveTrip(
          result.response.candidates[0]?.content.parts[0].text as TripDocument,
          formData
        );
        toast({
          variant: "default",
          className: "bg-green-500 text-white",
          description:
            "Your trip is successfully created, you will be redirected after 2s",
        });
        setTimeout(() => {
          router(`/trip/${docId}`);
        }, 2000);
      } else {
        toast({
          title: "There is an error, please try again later",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "There was an unexpected error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-5 mt-10 sm:px-10 lg:px-56">
      <h1 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h1>
      <p className="text-gray-500 mt-3 text-xl text-start ">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        <div>
          <h2 className="text-xl my-3 font-semibold">
            What is your destination?
          </h2>
          <Input
            type="text"
            onChange={(e) => {
              handleInputChange("destination", e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-semibold">
            How many days are you planning your trip?
          </h2>
          <Input
            type="number"
            step={1}
            onChange={(e) => {
              handleInputChange("days", e.target.value);
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-semibold">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-4">
            {budgets.map((budget) => {
              return (
                <div
                  onClick={() => {
                    handleInputChange("budget", budget.title);
                  }}
                  key={budget.id}
                  className={` p-4 border rounded-lg hover:shadow-md cursor-pointer ${
                    formData.budget === budget.title
                      ? "shadow-lg border-solid border-2 border-black"
                      : ""
                  }`}
                >
                  <h2 className="text-2xl">{budget.icon}</h2>
                  <h2 className="text-lg font-bold">{budget.title}</h2>
                  <h2 className="text-sm text-gray-500">{budget.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl my-3 font-semibold">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {travelCompanions.map((companion) => {
              return (
                <div
                  onClick={() => {
                    handleInputChange("companion", companion.title);
                  }}
                  key={companion.id}
                  className={` p-4 border rounded-lg hover:shadow-md cursor-pointer ${
                    formData.companion === companion.title
                      ? "shadow-lg border-solid border-2 border-black"
                      : ""
                  }`}
                >
                  <h2 className="text-2xl">{companion.icon}</h2>
                  <h2 className="text-lg font-bold">{companion.title}</h2>
                  <h2 className="text-sm text-gray-500">{companion.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>
        {loading ? <Spinner /> : ""}

        <div className="my-10 text-center">
          <Button
            disabled={loading ?? true}
            className="text-xl p-4 "
            onClick={() => {
              submitData();
            }}
          >
            {" "}
            Generate Trip!{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
