/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

import { tripData } from "@/create-trip/helper";
import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,

  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a travel plan for location : Hurghada , for 3 Days for 2 people  with a cheap budget, Give me a hotels options list with hotel name , address, rate ,price , image url ,description, and suggest itinerary with place name , place details, image url , rating  and time to travel each of the location for 3 days  with each plan with best time to visit in JSON format ",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotelOptions": [\n{\n"name": "Sunrise Marina Resort",\n"address": "Sahl Hasheesh Road, Hurghada, Egypt",\n      "rate": 4.5,\n      "price": "$50-$70 per night",\n      "imageUrl": "https://www.booking.com/hotel/eg/sunrise-marina-resort.en-gb.html",\n      "description": "A 4-star resort with a private beach, pools, and water sports activities. Offers affordable rates and comfortable accommodations."\n    },\n    {\n      "name": "Jaz Makadi Saraya Resort",\n      "address": "Makadi Bay, Hurghada, Egypt",\n      "rate": 4,\n      "price": "$60-$80 per night",\n      "imageUrl": "https://www.booking.com/hotel/eg/jaz-makadi-saraya-resort.en-gb.html",\n      "description": "A spacious resort with a variety of restaurants, bars, and entertainment options. Known for its beautiful beach and watersports activities."\n    },\n    {\n      "name": "The Three Corners Rihana Resort",\n      "address": "Sahl Hasheesh Road, Hurghada, Egypt",\n      "rate": 4.2,\n      "price": "$45-$65 per night",\n      "imageUrl": "https://www.booking.com/hotel/eg/the-three-corners-rihana-resort.en-gb.html",\n      "description": "A budget-friendly option with a good location near the beach and with access to water sports activities."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": "Day 1",\n      "bestTimeToVisit": "Morning",\n      "plan": [\n        {\n          "name": "Hurghada Marina",\n          "details": "Explore the vibrant Hurghada Marina, with its bustling atmosphere, shops, restaurants, and boats.",\n          "imageUrl": "https://www.flickr.com/photos/47797133@N03/4440111220",\n          "rating": 4.5,\n          "time": "2 hours"\n        },\n        {\n          "name": "Hurghada Grand Aquarium",\n          "details": "Discover a fascinating underwater world with diverse marine life at the Grand Aquarium.",\n          "imageUrl": "https://www.tripadvisor.com/Tourism-g297540-Attractions-Hurghada_Red_Sea_Governorate.html",\n          "rating": 4,\n          "time": "3 hours"\n        },\n        {\n          "name": "Sunset at the Beach",\n          "details": "Enjoy a relaxing evening by the beach, watching the beautiful sunset over the Red Sea.",\n          "imageUrl": "https://www.flickr.com/photos/131409009@N05/27811586343",\n          "rating": 5,\n          "time": "2 hours"\n        }\n      ]\n    },\n    {\n      "day": "Day 2",\n      "bestTimeToVisit": "Full Day",\n      "plan": [\n        {\n          "name": "Giftun Island",\n          "details": "Take a boat trip to the beautiful Giftun Island, known for its stunning beaches, coral reefs, and snorkeling opportunities.",\n          "imageUrl": "https://www.flickr.com/photos/65954006@N00/3331341133",\n          "rating": 4.8,\n          "time": "6 hours"\n        }\n      ]\n    },\n    {\n      "day": "Day 3",\n      "bestTimeToVisit": "Morning",\n      "plan": [\n        {\n          "name": "Hurghada Old Town",\n          "details": "Explore the charming Hurghada Old Town, with its traditional souks, mosques, and historic buildings.",\n          "imageUrl": "https://www.flickr.com/photos/131409009@N05/27791016703",\n          "rating": 4,\n          "time": "3 hours"\n        },\n        {\n          "name": "Mahmya Island",\n          "details": "Enjoy a day trip to the secluded Mahmya Island, with pristine beaches and crystal-clear waters. ",\n          "imageUrl": "https://www.flickr.com/photos/65954006@N00/3330305337",\n          "rating": 4.7,\n          "time": "6 hours"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Important Notes:**\n\n* **Transportation:** Consider using local buses or taxis for getting around within Hurghada. \n* **Bargaining:** Always bargain when shopping in the souks for souvenirs and local crafts.\n* **Currency:** The Egyptian pound is the local currency. You can exchange money at banks or exchange bureaus.\n* **Visa:** Most nationalities can enter Egypt visa-free for a short period. Check visa requirements based on your nationality.\n* **Food:** Try local delicacies like koshari, ful medames, and seafood. \n* **Safety:** Hurghada is generally a safe city, but as with any tourist destination, it\'s essential to be vigilant about personal belongings.\n* **Weather:** Hurghada enjoys a warm climate year-round. \n\n**Enjoy your trip to Hurghada!** \n',
        },
      ],
    },
  ],
});

export const getResult = async (data: tripData) => {
  const prompt: string = `Generate a travel plan for location : ${data.destination} , for ${data.days} Days for ${data.companion}  with a ${data.budget} budget, Give me a hotels options list with hotel name , address, rate ,price , image url ,description, and suggest itinerary with place name , place details, image url , rating  and time to travel each of the location for 3 days  with each plan with best time to visit in JSON format `;
  return await chatSession.sendMessage(prompt);
};
