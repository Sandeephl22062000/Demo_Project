import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";
const initialChallenge = {
  CreatedChallenges: null,
  showChallenges: [],
};

export const createChallenges = createAsyncThunk(
  "/challenge/createChallenge",
  async (data) => {
    const {
      challengeName,
      challengeRules,
      challengeDescription,
      receiver,
      token,
    } = data;
    try {
      const postData = await axios.post(
        `http://localhost:8000/api/challenges/`,
        {
          receiver,
          challengeName,
          challengeDescription,
          challengeRules,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(postData.data);
      return postData.data.post;
    } catch (error) {
      console.log(error);
    }
  }
);

export const showAllChallenges = createAsyncThunk(
  "/challenge/showChallenges",
  async (token) => {
    try {
      const postData = await axios.get(
        `http://localhost:8000/api/challenges/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(postData.data);
      return postData.data.body;
    } catch (error) {
      console.log(error);
    }
  }
);

const challengeSlice = createSlice({
  name: "challenge",
  initialState: initialChallenge,

  extraReducers: (builder) => {
    builder
      .addCase(createChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.CreatedChallenges = action.payload;
      })
      .addCase(createChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(showAllChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showAllChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.showChallenges = action.payload;
      })
      .addCase(showAllChallenges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default challengeSlice.reducer;
