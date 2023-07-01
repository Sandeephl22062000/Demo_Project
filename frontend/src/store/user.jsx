import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
const initialUser = {
  FindUserByID: null,
  token: "",
  userInfo: null,
  userInfoById: null,
  ApprovedTrainer: null,
  TrainersYetToApproved: [],
  SearchUserResult: [],
  getAcceptedNoatifcation: [],
  getRejectedNoatifcation: [],

  MessageReaded: [],
};

export const loginUser = createAsyncThunk(
  "/user/loginUser",
  async ({ email, password, addToast, navigate }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        }
      );
      const { token } = data;
      console.log(data.data);
      localStorage.setItem("id", data.data);
      console.log(token);
      localStorage.setItem("token", token);

      console.log("postData", data);
      addToast(data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      navigate("/");
      return token;
    } catch (error) {
      console.log(error.response.data.message);
      // Handle error and show toast if necessary
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  }
);
export const UserByID = createAsyncThunk("/user/userDetail", async () => {
  const Userid = localStorage.getItem("id");
  console.log("Avdfvdfv");
  console.log("sdfsdfs", Userid);
  const postData = await axios.get(`http://localhost:8000/api/users/${Userid}`);
  console.log(postData.data);
  return postData.data.data;
});

export const trainerToBeApproved = createAsyncThunk(
  "/user/trainertoApprove",
  async () => {
    const getData = await axios.get(
      `http://localhost:8000/api/trainer/trainertoapprove`
    );
    console.log(getData.data);
    return getData.data.data;
  }
);
export const approveRequest = createAsyncThunk(
  "/user/approveRequest",
  async (id) => {
    const getData = await axios.post(
      `http://localhost:8000/api/trainer/approverequest`,
      {
        id,
      }
    );
    console.log(getData.data);
    return getData.data;
  }
);

export const getNoatifcation = createAsyncThunk(
  "/user/getAllNoatification",
  async ({ token }) => {
    console.log(token, "fvrsdvrt");
    const getData = await axios.get(
      `http://localhost:8000/api/request/getallrequestOfuser/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(getData.data);
    return getData.data;
  }
);

export const getAcceptedNoatifcation = createAsyncThunk(
  "/user/getacceptedrequest",
  async ({ token }) => {
    console.log("efwqefwe", token, "fvrsdvrt");
    const getData = await axios.get(
      `http://localhost:8000/api/request/getacceptedrequest`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("sasasasasasasa", getData?.data);
    return getData?.data?.request;
  }
);

export const getRejectedNoatifcation = createAsyncThunk(
  "/user/getrejectedrequest",
  async ({ token }) => {
    console.log("efwqefwe", token, "fvrsdvrt");
    const getData = await axios.get(
      `http://localhost:8000/api/request/getrejectedrequest`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("sasasasasasasa", getData?.data);
    return getData?.data?.request;
  }
);

export const messageReaded = createAsyncThunk(
  "/user/messageReaded",
  async ({ token }) => {
    console.log("efwqefwe", token, "fvrsdvrt");
    const getData = await axios.get(
      `http://localhost:8000/api/request/readedmessage`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(getData.data);
    return getData?.data?.request;
  }
);

export const searchUserKeyword = createAsyncThunk(
  "/user/searchUser",
  async (search) => {
    const getData = await axios.get(
      `http://localhost:8000/api/users/searchusers/${search}`
    );
    console.log(getData.data);
    return getData.data.data;
  }
);

export const updateUser = createAsyncThunk(
  "/user/updateUserdetail",
  async (details) => {
    const {
      name,
      email,
      specialization,
      experiences,
      Userid,
      token,
      addToast,
    } = details;
    console.log(token);
    try {
      const postData = await axios.patch(
        `http://localhost:8000/api/users/updatedetails/${Userid}`,
        {
          name,
          email,
          specialization,
          experiences,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${details.token}`,
          },
        }
      );
      console.log(postData.data);
      addToast(postData.data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      return postData.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(UserByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserByID.fulfilled, (state, action) => {
        state.loading = false;
        state.FindUserByID = action.payload;
      })
      .addCase(UserByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(approveRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.ApprovedTrainer = action.payload;
      })
      .addCase(approveRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(trainerToBeApproved.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trainerToBeApproved.fulfilled, (state, action) => {
        state.loading = false;
        state.TrainersYetToApproved = action.payload;
      })
      .addCase(trainerToBeApproved.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchUserKeyword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUserKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.SearchUserResult = action.payload;
      })
      .addCase(searchUserKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getNoatifcation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNoatifcation.fulfilled, (state, action) => {
        state.loading = false;
        state.GetUserNoatification = action.payload;
      })
      .addCase(getNoatifcation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAcceptedNoatifcation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAcceptedNoatifcation.fulfilled, (state, action) => {
        state.loading = false;
        state.GetAcceptedNoatifcation = action.payload;
      })
      .addCase(getAcceptedNoatifcation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRejectedNoatifcation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRejectedNoatifcation.fulfilled, (state, action) => {
        state.loading = false;
        state.GetRejectedNoatifcation = action.payload;
      })
      .addCase(getRejectedNoatifcation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(messageReaded.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(messageReaded.fulfilled, (state, action) => {
        state.loading = false;
        state.MessageReaded = action.payload;
      })
      .addCase(messageReaded.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
