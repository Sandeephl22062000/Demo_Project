import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Button, Table } from "@mui/material";
import { updateUser } from "../../store/user";

const UpdateProfileModal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experiences, setExperiences] = useState("");
  const [specialization, setSpecialization] = useState("");
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const user = useSelector((state) => state?.user?.FindUserByID);
  console.log(user);
  const Userid = localStorage.getItem("id");
  const token = useSelector((state) => state.user.token);
  console.log("user-id", Userid);
  const handleEditClick = () => {
    console.log(name, email, experiences, specialization);
    dispatch(
      updateUser({
        name,
        email,
        specialization,
        experiences,
        Userid,
        token,
        addToast,
      })
    );
    setName("");
    setEmail("");
    setExperiences("");
    setSpecialization("");
  };

  return (
    <ModalDialog
      aria-labelledby="variant-modal-title"
      aria-describedby="variant-modal-description"
      variant={props.variant}
    >
      <ModalClose />
      <Table aria-label="basic table" sx={{ marginTop: "30px" }}>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <input
                type="text"
                placeholder={user?.data?.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input
                type="text"
                placeholder={user?.data?.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          {user?.role === 1 && (
            <>
              <tr>
                <td>Experience:</td>
                <td>
                  <input
                    type="text"
                    placeholder={user?.data?.experiences}
                    value={experiences}
                    onChange={(e) => setExperiences(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Specialization:</td>
                <td>
                  <input
                    type="text"
                    placeholder={user?.data?.specialization}
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
      <Button
        sx={{ background: "black", color: "white", margin: "15px" }}
        onClick={handleEditClick}
      >
        EDIT
      </Button>
    </ModalDialog>
  );
};

export default UpdateProfileModal;
