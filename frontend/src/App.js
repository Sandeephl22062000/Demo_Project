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
import CalorieDetail from "./components/Food/pageEdited";

import TrainerSigup from "./components/Auth/trainerSignup";
import ClientsExperince from "./ClientsExperince";
import ShowPost from "./components/ShowPost";
// import Chats from "./components/Chat/chat"
import ExeprmientFoodApi from "./components/Food/ExeprmientFoodApi";
import Profile from "./components/MyProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProfileToShow from "./components/ProfileToShow";
import ViewAllRecords from "./components/Food/ViewAllRecords";
import { useState } from "react";
import Challenges from "./components/Challenges/challengesTOShow";
const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);
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

              <Route path="/food" element={<UserInput />} />
              <Route
                path="/food/calculateCalories"
                element={<CalorieDetail />}
              />
              <Route
                path="/calculatediet/:protein/:carbs/:calories"
                element={<ExeprmientFoodApi />}
              />
              <Route path="/viewallrecords" element={<ViewAllRecords />} />

              <Route path="/trainer" element={<TrainerCards />} />
              <Route path="/trainer/:id" element={<TrainerProfile />} />
              <Route path="/user/:id" element={<ProfileToShow />} />

              <Route path="/exercise" element={<Exercises />} />
              {/* <Route path="/chat" element={<Chats />} /> */}
              <Route path="/clientexperiences" element={<ClientsExperince />} />

              <Route path="/profile" element={<Profile />} />

              <Route
                path="/execiseVideos/:muscle/:exercise"
                element={<ExerciseVideos />}
              />
              <Route path="/activities" element={<ShowPost />} />

              <Route path="/challenges" element={<Challenges />} />
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
