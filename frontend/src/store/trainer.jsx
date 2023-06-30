import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";

const initialTrainer = {
  trainer: null,
  trainerInfo: null,
  trainerInfoById: null,
  getRequestWithTrainerId: null,
  getAllPendingRequest: [],
};

export const loginTrainer = createAsyncThunk(
  "/trainer/loginTrainer",
  async ({ email, password }) => {
    const postData = await axios.post("http://localhost:8000/api/users/login", {
      email,
      password,
    });
    localStorage.setItem("TrainerInfo", JSON.stringify(postData.data));
    return postData.data;
  }
);

export const RegisterTrainer = createAsyncThunk(
  "/trainer/loginTrainer",
  async ({
    email,
    password,
    name,
    photo,
    role,
    specialization,
    experiences,
    addToast,
    navigate,
  }) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/users/register",
      {
        name,
        email,
        password,
        photo,
        role,
        specialization,
        experiences,
      }
    );
    console.log(data.data);
    addToast(data.message, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    // navigate("/login");
    return data.data;
  }
);

export const requestTrainer = createAsyncThunk(
  "/trainer/requestTrainer",
  async (data) => {
    const { trainer, message, token } = data;
    const postData = await axios.post(
      `http://localhost:8000/api/request/createrequest/${trainer}`,
      {
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(postData.data);
    return postData.data;
  }
);

export const getRequestOfTrainer = createAsyncThunk(
  "/trainer/requestTrainer",
  async (data) => {
    const { trainer, token } = data;
    const postData = await axios.get(
      `http://localhost:8000/api/request/getrequest/${trainer}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(postData.data);
    return postData.data;
  }
);

export const acceptRequest = createAsyncThunk(
  "/trainer/acceptRequest",
  async (data) => {
    const { id, token } = data;
    const postData = await axios.get(
      `http://localhost:8000/api/request/acceptRequest/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(postData.data);
    return postData.data;
  }
);

export const rejectRequest = createAsyncThunk(
  "/trainer/rejectRequest",
  async (data) => {
    const { id, token } = data;
    const postData = await axios.get(
      `http://localhost:8000/api/request/rejectRequest/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(postData.data);
    return postData.data;
  }
);
// export const PendingRequest = createAsyncThunk(
//   "/trainer/pendingRequest",
//   async (data) => {
//     const { token } = data;
//     const postData = await axios.get(
//       `http://localhost:8000/api/request/pendingRequest/`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log("pendingRequests", postData.data.request);
//     return postData.data.request;
//   }
// );
export const TrainerById = createAsyncThunk(
  "/trainer/trainerDetail",
  async (id, token) => {
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
      .addCase(RegisterTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.trainer = action.payload;
      })
      .addCase(RegisterTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
      })
      // .addCase(PendingRequest.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(PendingRequest.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.getAllPendingRequest = action.payload;
      // })
      // .addCase(PendingRequest.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      .addCase(requestTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.trainer = action.payload;
      })
      .addCase(requestTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRequestOfTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRequestOfTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.getRequestWithTrainerId = action.payload;
      })
      .addCase(getRequestOfTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default trainerSlice.reducer;
