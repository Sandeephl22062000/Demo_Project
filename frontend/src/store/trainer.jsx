import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";

const initialTrainer = {
  trainerInfo: null,
  trainerInfoById: null,
};

export const loginTrainer = createAsyncThunk(
  "/trainer/loginTrainer",
  async ({ email, password }) => {
    const postData = await axios.post(
      "http://localhost:8000/api/users/login",
      {
        email,
        password,
      }
    );
    localStorage.setItem("TrainerInfo", JSON.stringify(postData.data));
    return postData.data;
  }
);
export const TrainerById = createAsyncThunk(
  "/trainer/trainerDetail",
  async (id) => {
    const postData = await axios.get(
      `http://localhost:8000/api/trainer/trainerDetail/${id}`
    );
    console.log(postData.data.data);
    return postData.data.data;
  }
);

const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    trainer: initialTrainer,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.trainer = action.payload;
      })
      .addCase(loginTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(TrainerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TrainerById.fulfilled, (state, action) => {
        state.loading = false;
        state.trainer = action.payload;
      })
      .addCase(TrainerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default trainerSlice.reducer;
