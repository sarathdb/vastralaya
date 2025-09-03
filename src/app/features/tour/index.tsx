import * as React from "react";
import {
  Box,
  Typography,
  Container,
  BottomNavigation,
  Paper,
} from "@mui/material";
import ImageCollage from "../../components/ImageCollage";
import ControlledAccordions from "../../components/Accordion";
import BasicModal from "../../components/BasicModal";
const Tour = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Container>
      <Typography variant="h3" component="h1" marginTop={2}>
        Explore the World in Vegas
      </Typography>
      <Box marginTop={3} sx={{ display: "flex" }}>
        <img
          src="https://www.lasvegasdirect.com/wp-content/uploads/2021/04/Las-Vegas-Tours.png"
          alt="Vegas"
          height={325}
        />
        <ImageCollage />
      </Box>
      <Box>
        <Typography variant="h6" component="h4" marginTop={3}>
          About this ticket
        </Typography>
        <Typography variant="body1" component="p" marginTop={3}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
          vel esse suscipit facere inventore molestiae dignissimos adipisci a
          officia sit dolor sapiente provident, aut explicabo consectetur
          consequatur quia neque labore!
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 10, marginTop: 3 }}>
        <Typography variant="h6" component="h4" marginTop={3} marginBottom={3}>
          Frequently asked Questions
        </Typography>
        <ControlledAccordions />
      </Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        >
          <BasicModal />
        </BottomNavigation>
      </Paper>
    </Container>
  );
};

export default Tour;
