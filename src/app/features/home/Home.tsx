import * as React from "react";
import Grid from "@mui/material/Grid2";
import TourCard from "../tour/TourCard";
import { Container, Typography } from "@mui/material";
import cities from "../../../data.json";
// import ProductsDock from "../../components/ProductsDock";
// import TaskPanel from "../../components/TaskPanel";
// import FloatingDock from "../../components/FloatingDock";
// import TaskPanelDock from "../../components/TaskPanelDock";
// import HorizontalDock from "../../components/horizontalDock/horizontalDock";
import NodeFactoryMenu from "../../components/nodeMenu/NodeFactoryMenu";

const Home = () => {
  // const [productsDockOpen, setProductsDockOpen] = React.useState(false);

  const handleTourClick = (tour: any) => {
    console.log("Tour clicked:", tour);
    // setProductsDockOpen(true);
  };

  // const handleProductsDockClose = () => {
  //   setProductsDockOpen(false);
  // };

  return (
    <Container>
      {cities.map((city) => (
        <>
          <Typography
            variant="h4"
            component="h2"
            marginTop={5}
            marginBottom={3}
          >
            {city.name}
          </Typography>
          <Grid container spacing={5}>
            {city.tours.map((tour, index) => (
              <TourCard key={index} tour={tour} onClick={handleTourClick} />
            ))}
          </Grid>
        </>
      ))}
      {/* <TaskPanel open={productsDockOpen} onClose={handleProductsDockClose} /> */}
      {/* <ProductsDock open={productsDockOpen} onClose={handleProductsDockClose} /> */}
      {/* <TaskPanelDock
        open={productsDockOpen}
        onClose={handleProductsDockClose}
      /> */}
      {/* <HorizontalDock /> */}
      <NodeFactoryMenu
        open={true}
        onSelect={() => {}}
        position={{ x: 500, y: 440 }}
      />
    </Container>
  );
};

export default Home;
