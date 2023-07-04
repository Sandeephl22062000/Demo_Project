import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Food } from "./components/Food/Food";
import TrainerCards from "./components/Trainer-Info/TrainerCards";
import TrainerProfile from "./components/Trainer-Info/TrainerProfile";
import Exercises from "./components/Exercises/Exercises";
import ExerciseVideos from "./components/Exercises/ExerciseVideo";
import Signup from "./components/Auth/signup";
import UserInput from "./components/Food/userInput";
import Login from "./components/Auth/login";
import CalorieDetail from "./components/Food/calorieCalculation";

import TrainerSigup from "./components/Auth/trainerSignup";
import ShowPost from "./components/Activities/ShowPost";
import ExeprmientFoodApi from "./components/Food/FoodTracking";
import Profile from "./components/MyProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProfileToShow from "./components/ProfileToShow";
import ViewAllRecords from "./components/Food/ViewAllRecords";
import Gym from "./components/Gyms/nearByGym";
import { useState } from "react";
import Createservices from "./components/createservices";
import IntelligentDiet from "./components/Food/IntelligentDiet";
import { useSelector } from "react-redux";
import Protected from "./ProtectingRoutes";
const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const isLoggedIn = useSelector((state) => state?.user?.token);

  return (
    <div>
      <BrowserRouter>
        {isAdmin ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/trainersignup" element={<TrainerSigup />} />

              <Route
                path="/food"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <UserInput />
                  </Protected>
                }
              />
              <Route
                path="/food/calculateCalories"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <CalorieDetail />
                  </Protected>
                }
              />
              <Route
                path="/calculatediet"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <ExeprmientFoodApi />
                  </Protected>
                }
              />
              <Route
                path="/viewallrecords"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <ViewAllRecords />
                  </Protected>
                }
              />
              <Route
                path="/dietprovider"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <IntelligentDiet />
                  </Protected>
                }
              />

              <Route
                path="/trainer"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <TrainerCards />
                  </Protected>
                }
              />
              <Route
                path="/trainer/:id"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <TrainerProfile />
                  </Protected>
                }
              />
              <Route
                path="/services"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <Createservices />
                  </Protected>
                }
              />
              <Route
                path="/user/:id"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <ProfileToShow />
                  </Protected>
                }
              />

              <Route path="/gyms" element={<Gym />} />

              <Route path="/exercise" element={<Exercises />} />

              <Route
                path="/profile"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <Profile />
                  </Protected>
                }
              />

              <Route
                path="/execiseVideos/:muscle/:exercise"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <ExerciseVideos />
                  </Protected>
                }
              />
              <Route
                path="/activities"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <ShowPost />
                  </Protected>
                }
              />
            </Routes>
            <Footer />
          </>
        ) : (
          <>
            <Routes>
              <Route path="/admindashboard" element={<AdminDashboard />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
