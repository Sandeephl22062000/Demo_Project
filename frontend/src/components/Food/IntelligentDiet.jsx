import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const MealPlan = ({ mealPlan }) => {
  return (
    <div>
      {mealPlan.map((meal) => (
        <div key={meal.mealNumber}>
          <h2>{meal.mealNumber}</h2>
          <ul>
            {meal.foods.map((food, index) => (
              <li key={index}>
                {food.name} ({food.calories} calories, {food.protein}g protein,{" "}
                {food.carbohydrates}g carbohydrates)
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const IntelligentDiet = () => {
  const [response, setResponse] = useState("");

  const res = async () => {
    const resp = await axios.post(
      "http://localhost:8000/api/users/intelligentdiet",
      {
        calories: "2500",
        protein: "300",
        carbs: "10",
      }
    );
    setResponse(resp?.data?.choices[0].message?.content);
  };
  // Assuming you have received the response in a variable called 'response'

  // Parse the response and extract meal information

  const mealPlan = parseResponse(response);
  const sendRequest = () => {
    res();
  };
  return (
    <div>
      <h1>Vegetarian Meal Plan</h1>
      {console.log(response)};<p>{response}</p>
      <button onClick={sendRequest}>Respomse</button>
      <p>{response}</p>
      <MealPlan mealPlan={mealPlan} />
    </div>
  );
};

// // Function to parse the response and extract meal information
// Function to parse the response and extract meal information
// Function to parse the response and extract meal information
const parseResponse = (response) => {
  // Split the response by the "\n\nMeal" delimiter
  const meals = response.split("\n\nMeal");

  // Define meal names
  const mealNames = [
    "Breakfast",
    "Morning Snack",
    "Lunch",
    "Evening Snack",
    "Dinner",
    "Last Meal",
  ];

  // Initialize an empty array to store meal information
  const mealPlan = [];

  // Iterate over the meal strings
  for (let i = 1; i < meals.length; i++) {
    const mealString = meals[i];

    // Split each meal string into lines
    const lines = mealString.split("\n");

    // Extract the meal number from the first line
    const mealNumber = lines[0].trim();

    // Get the meal name based on the meal number
    const mealName = mealNames[(mealNumber - 1) % 5];

    // Initialize an empty array to store food information for the meal
    const foods = [];

    // Iterate over the lines starting from the second line
    for (let j = 1; j < lines.length; j++) {
      const line = lines[j].trim();

      // Split each line by the " (" delimiter to separate food name from nutrition information
      const [foodName, nutritionInfo] = line.split(" (");

      // Check if nutritionInfo exists
      if (nutritionInfo) {
        // Split the nutrition information by commas to extract calories, protein, and carbohydrates
        const nutritionArray = nutritionInfo.replace(")", "").split(",");

        // Check if all nutrition values are provided and are valid numbers
        const [calories, protein, carbohydrates] = nutritionArray.map(
          (value) => {
            const parsedValue = parseInt(value.trim());
            return isNaN(parsedValue) ? 0 : parsedValue;
          }
        );

        // Create an object to store the food information
        const food = {
          name: foodName,
          calories,
          protein,
          carbohydrates,
        };

        // Add the food object to the foods array
        foods.push(food);
      }
    }

    // Create an object to store the meal information
    const meal = {
      mealNumber,
      mealName,
      foods,
    };

    // Add the meal object to the mealPlan array
    mealPlan.push(meal);
  }

  return mealPlan;
};

export default IntelligentDiet;
