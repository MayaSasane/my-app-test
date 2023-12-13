import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, CardContent, Button, Link, Box, CardMedia } from "@mui/material";
import {  useParams } from "react-router-dom";

const BreedDetail = () => {
  const [breedDetails, setBreedDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBreedDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`,
          {
            headers: {
              "x-api-key":
                "live_HPvtNnVPu1A9xKut0K5qyf3W1PDYmtd0bF5cO9E4b91gexTeAIiryvgkuMhgSiqP",
            },
          }
        );

        // Assuming the first breed in the breeds array is the relevant breed info
        const breedInfo = response.data[0].breeds[0];

        // Combine breed details with image information
        const breedDetailsData = {
          ...breedInfo,
          url: response.data[0].url,
          width: response.data[0].width,
          height: response.data[0].height,
        };

        setBreedDetails(breedDetailsData);
      } catch (error) {
        console.error("Error fetching cat breed details:", error);
      }
    };

    fetchBreedDetails();
  }, [id]);



  if (!breedDetails) {
    return <div>Loading...</div>;
  }

  const {
    name,
    origin,
    weight,
    hairless,
    wikipedia_url,
    description,
    temperament,
    life_span,
    url,
    width,
    height,
  } = breedDetails;
console.log(breedDetails);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3" gutterBottom>
        {name}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          alt={name}
        //   height={height}
        //   width={width}
          style={{ height: "300px" , width: "700px"}} // Set your desired fixed height
          image={url}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            Origin: {origin}
          </Typography>
          <Typography variant="body1">Description: {description}</Typography>
          <Typography variant="body1">Temperament: {temperament}</Typography>
          <Typography variant="body1">Life Span: {life_span}</Typography>
          <Typography variant="body1">
            Weight: {weight.metric} kg ({weight.imperial} lbs)
          </Typography>
          <Typography variant="body1">
            Hairless: {hairless ? "Yes" : "No"}
          </Typography>
          <Button variant="contained" href={wikipedia_url} target="_blank" style={{ marginRight: '8px' }} >
            Wikipedia
          </Button>
         
        </CardContent>
      </Card>
    </Box>
  );
};

export default BreedDetail;
