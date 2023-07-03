import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function ProductCard({ meal }) {
  console.log(meal);
  return (
    <Card
      sx={{ width: 320, maxWidth: "100%", boxShadow: "lg", margin: "1rem" }}
    >
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography fontSize="xl" fontWeight="xl" sx={{ mt: 1 }}>
          {meal?.Item}
        </Typography>
        <Typography level="body2">
          Protein:{meal?.Protein}
          <br />
          Carbohydrates:{meal?.Carbohydrates}
          <br />
          Calories:{meal?.Calories}
        </Typography>
      </CardContent>
    </Card>
  );
}
