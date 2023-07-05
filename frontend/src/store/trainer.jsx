import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";

const initialTrainer = {
  trainer: null,
  trainerInfo: null,
  trainerInfoById: null,
  getRequestWithTrainerId: null,
  trainerServicesList: [],
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
    const { trainerID, token } = data;
    console.log(trainerID, token);
    const postData = await axios.post(
      `http://localhost:8000/api/request/createrequest/${trainerID}`,
      {},
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
  "/trainer/getAllrequestTrainer",
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

export const createServices = createAsyncThunk(
  "/trainer/createServices",
  async ({ token, service, addToast, navigate }) => {
    const postData = await axios.post(
      `http://localhost:8000/api/trainer/services`,
      { service },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    addToast(postData.data.message, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    // navigate("/profile");
    console.log(postData.data);
    return postData.data.service;
  }
);

export const getservices = createAsyncThunk(
  "/trainer/getServices",
  async ({ trainerID, token }) => {
    console.log("SDfsdfs", trainerID, "fvdsfv", token);
    const postData = await axios.get(
      `http://localhost:8000/api/trainer/getallservice/${trainerID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(postData.data.services);
    return postData?.data?.services;
  }
);

export const editServices = createAsyncThunk(
  "/trainer/editServices",
  async ({ id, token, charges, duration, description }) => {
    const postData = await axios.put(
      `http://localhost:8000/api/trainer/editServices/${id}`,
      {
        charges,
        duration,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);

export const deleteServices = createAsyncThunk(
  "/trainer/deleteServices",
  async ({ id, token }) => {
    console.log(id);
    const postData = await axios.delete(
      `http://localhost:8000/api/trainer/deleteServices/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(postData.data);
    return postData?.data?.services;
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

      .addCase(TrainerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TrainerById.fulfilled, (state, action) => {
        state.loading = false;
        state.trainerInfoById = action.payload;
      })
      .addCase(TrainerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getservices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getservices.fulfilled, (state, action) => {
        state.loading = false;
        state.trainerServicesList = action.payload;
      })
      .addCase(getservices.rejected, (state, action) => {
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
