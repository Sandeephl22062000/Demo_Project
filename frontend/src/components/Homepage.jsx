import React from 'react'
import Hero from "./Frontpage/Hero";
import ActivityFeed from "./Frontpage/ActivityFeeds";
import TrainerPage from "./Frontpage/TrainerPage.jsx.js";
import FoodPage from "./Frontpage/Foodpage";
// import Pricing from "./Pricing/Pricing";
// import Gallery from "./Gallery/Gallery";
// import Trainers from "./Trainers/Trainers";
// import Summer from "./Summer/Summer";
import ExerciseDatabase from "./Frontpage/ExerciseDatabase"
const Homepage = () => {
  return (
    <div>
      <Hero />
      <ActivityFeed />
      <TrainerPage />
      <FoodPage />
      <ExerciseDatabase/>
    </div>
  )
}

export default Homepage
