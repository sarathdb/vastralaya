import React from "react";
import { Box, Paper, Typography, Rating } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "../../index.css";
import { AccessTime } from "@mui/icons-material";

type TourProps = {
  tour: any;
  onClick?: (tour: any) => void;
};

const TourCard = ({ tour, onClick }: TourProps) => {
  return (
    <Grid size={3}>
      <Paper
        elevation={3}
        sx={{ cursor: "pointer" }}
        onClick={() => onClick?.(tour)}
      >
        <img src={tour.image} className="img" />
        <Box padding={1}>
          <Typography variant="subtitle1" component="h2">
            {tour.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <AccessTime sx={{ width: 12.5 }} />
            <Typography variant="body2" component="p" marginLeft={0.5}>
              {tour.duration} hours
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              // flexDirection: "row",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Rating
              name="read-only"
              value={tour.rating}
              readOnly
              precision={0.25}
              size="small"
            />
            <Typography variant="body2" component="p" marginLeft={0.5}>
              {tour.rating}
            </Typography>
            <Typography variant="body2" component="p" marginLeft={1.5}>
              ( {tour.numberOfReviews} reviews)
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" component="h3" marginTop={0}>
              From C ${tour.price}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default TourCard;
