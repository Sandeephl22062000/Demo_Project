import React from 'react'
import Hero from "./Frontpage.jsx/Hero";
import ActivityFeed from "./Frontpage.jsx/ActivityFeeds";
import TrainerPage from "./Frontpage.jsx/TrainerPage.jsx.js";
import FoodPage from "./Frontpage.jsx/Foodpage";
// import Pricing from "./Pricing/Pricing";
// import Gallery from "./Gallery/Gallery";
// import Trainers from "./Trainers/Trainers";
// import Summer from "./Summer/Summer";
import ExerciseDatabase from "./Frontpage.jsx/ExerciseDatabase"
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
