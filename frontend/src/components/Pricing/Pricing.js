import { css, jsx } from "@emotion/core";
import Heading from "../Global/Heading/Heading";
import PricingCard from "./PricingCard";
import { Card, CardActionArea, CardContent, CardMedia, Container, Typography } from "@mui/material";
import React from "react";

const Pricing = () => {
  return (
    <div css={css`background-color: black;`}>
      <Container >
        <Heading
          title="OUR PRICING"
          info="There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration."
        />
        <div className="card-wrapper" css={css`display: flex; justify-content: space-between; margin: 40px;`}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240" // Increase the height of the card image
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240" // Increase the height of the card image
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Pricing;


// import { css, jsx } from "@emotion/core";
// import Heading from "../Global/Heading/Heading";
// import PricingCard from "./PricingCard";
// import { Card, CardActionArea, CardContent, CardMedia, Container, Typography } from "@mui/material";
// import React from "react"
// const Pricing = () => {
//   return (
//    <div >
//       <Container >
//         <Heading
//           title="OUR PRICING"
//           info="There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration."
//         />
//         <div className="card-wrapper">
//           <Card sx={{ maxWidth: 345 }}>
//             <CardActionArea>
//               <CardMedia
//                 component="img"
//                 height="240" // Increase the height of the card image
//                 image="/static/images/cards/contemplative-reptile.jpg"
//                 alt="green iguana"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Lizard
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//           <Card sx={{ maxWidth: 345 }}>
//             <CardActionArea>
//               <CardMedia
//                 component="img"
//                 height="240" // Increase the height of the card image
//                 image="/static/images/cards/contemplative-reptile.jpg"
//                 alt="green iguana"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Lizard
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         </div>
//       </Container>
//    </div>
//   );
// };
// export default Pricing;

// /** @jsx jsx */
// import { css, jsx } from "@emotion/core";
// import Heading from "../Global/Heading/Heading";
// import PricingCard from "./PricingCard";
// import { Card, CardActionArea, CardContent, CardMedia, Container, Typography } from "@mui/material";

// const Pricing = () => {
//   return (
//     <section className="pricing" css={styles}>
//       <Container>
//         <Heading
//           title="OUR PRICING"
//           info="There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration."
//         />
//         <Card sx={{ maxWidth: 345 }}>
//           <CardActionArea>
//             <CardMedia
//               component="img"
//               height="140"
//               image="/static/images/cards/contemplative-reptile.jpg"
//               alt="green iguana"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 Lizard
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Lizards are a widespread group of squamate reptiles, with over
//                 6,000 species, ranging across all continents except Antarctica
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//         <Card sx={{ maxWidth: 345 }}>
//           <CardActionArea>
//             <CardMedia
//               component="img"
//               height="140"
//               image="/static/images/cards/contemplative-reptile.jpg"
//               alt="green iguana"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 Lizard
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Lizards are a widespread group of squamate reptiles, with over
//                 6,000 species, ranging across all continents except Antarctica
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
        
//       </Container>
//     </section>
//   );
// };

// const styles = css`
//   width: 100%;
//   background: #000;
//   .container {
//     padding: 150px 0;
//     max-width: 1200px;
//     .wrapper {
//       padding: 80px 0 0 0;
//       display: flex;
//       justify-content: space-between;
//     }
//   }
//   @media (max-width: 730px) {
//     .container {
//       .wrapper {
//         flex-direction: column;
//         flex-wrap: wrap;
//         .pricingCard {
//           margin: 10px auto;
//         }
//       }
//     }
//   }

//   @media (min-width: 731px) and (max-width: 1320px) {
//     .container {
//       .wrapper {
//         flex-wrap: wrap;
//         .pricingCard {
//           max-width: 33%;
//           margin: 20px 0 0 0;
//         }
//       }
//     }
//   }
// `;

// export default Pricing;
