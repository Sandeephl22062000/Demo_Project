import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";
const initialFood = {
  calculateFoodCalories: 0,
  priorUserDetails: {},
  loading: false,
  priorFoodCaloryvalue: 0,
};

export const calculateCalories = createAsyncThunk(
  "/food/foodDetail",
  async (data) => {
    console.log(data);
    const { weight, height, age, gender, activity, token, addToast } = data;
    console.log(weight, height, age, gender, activity);
    const sendData = await axios.post(
      "http://localhost:8000/api/users/caloriecalculator/savedetail",
      {
        weight,
        height,
        age,
        gender,
        activity,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("sendData", sendData);
    addToast(sendData.data.message, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    return sendData.data.data;
  }
);

export const priorFoodDetails = createAsyncThunk(
  "/food/priorFoodDetail",
  async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/updateCalories",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const priorFoodCalory = createAsyncThunk(
  "/food/priorFoodCalory",
  async (token) => {
    try {
      console.log("Vzdfvdrvzdfvfz");
      const response = await axios.post(
        "http://localhost:8000/api/users/getMaintainceCalory",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      console.log(data?.maintainceCalory);
      return data?.maintainceCalory;
    } catch (error) {
      console.log(error);
    }
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState: initialFood,

  extraReducers: (builder) => {
    builder
      .addCase(calculateCalories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateCalories.fulfilled, (state, action) => {
        state.loading = false;
        console.log("");

        state.calculateFoodCalories = action.payload;
      })
      .addCase(calculateCalories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(priorFoodDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(priorFoodDetails.fulfilled, (state, action) => {
        state.loading = false;

        state.priorUserDetails = action.payload;
      })
      .addCase(priorFoodDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(priorFoodCalory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(priorFoodCalory.fulfilled, (state, action) => {
        state.loading = false;

        state.priorFoodCaloryvalue = action.payload;
      })
      .addCase(priorFoodCalory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;
