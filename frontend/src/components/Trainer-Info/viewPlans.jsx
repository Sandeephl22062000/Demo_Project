import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Sheet from "@mui/joy/Sheet";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Box, Button } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";

export default function OverlayRadio({ trainer, trainerPhoto }) {
  const features = [
    { duration: "1", charges: "Rs 1000" },
    { duration: "3", charges: "Rs 3000" },
    { duration: "6", charges: "Rs 6000" },
    { duration: "12", charges: "Rs 12000" },
  ];
  console.log(trainer, trainerPhoto);
  const handleSubmit = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    // Add your logic here to handle the selected option
  };

  const [selectedOption, setSelectedOption] = React.useState("Website");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_8ryBijpHhTbHDx",
      amount: data.amount,
      currency: data.currency,
      name: trainer,
      description: "Test Transaction",
      image: trainerPhoto,
      order_id: data.id,
      handler: async (response) => {
        try {
          console.log(response);
          const verifyUrl = "http://localhost:8000/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8000/api/payment/order";
      const { data } = await axios.post(orderUrl, { amount: selectedOption });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProceedClick = () => {
    handleSubmit(selectedOption);
  };

  return (
    <FormControl>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <FormLabel>Selected Plans</FormLabel>
      </Box>
      <RadioGroup
        aria-label="platform"
        value={selectedOption}
        onChange={handleOptionChange}
        overlay
        name="platform"
        sx={{
          flexDirection: "row",
          gap: 2,
          [`& .${radioClasses.checked}`]: {
            [`& .${radioClasses.action}`]: {
              inset: -1,
              border: "3px solid",
              borderColor: "primary.500",
            },
          },
          [`& .${radioClasses.radio}`]: {
            display: "contents",
            "& > svg": {
              zIndex: 2,
              position: "absolute",
              top: "-8px",
              right: "-8px",
              bgcolor: "background.body",
              borderRadius: "50%",
            },
          },
        }}
      >
        {features.map((feature) => (
          <Sheet
            key={feature.duration}
            variant="outlined"
            sx={{
              borderRadius: "md",
              bgcolor: "background.body",
              boxShadow: "sm",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              p: 2,
              minWidth: 120,
            }}
          >
            <Radio
              id={feature.duration}
              value={feature.duration}
              checkedIcon={<CurrencyRupeeIcon />}
            />
            <Avatar variant="soft" size="sm">
              {<CurrencyRupeeIcon />}
            </Avatar>
            <FormLabel htmlFor={feature.duration}>
              {feature.duration} Month - {feature.charges}
            </FormLabel>
          </Sheet>
        ))}
      </RadioGroup>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handlePayment}
          sx={{
            background: "black",
            color: "white",
            height: "50px",
            width: "100px",
          }}
        >
          Proceed
        </Button>
      </Box>
    </FormControl>
  );
}
