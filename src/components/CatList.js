import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CatList = ({ onSelectBreed }) => {
  const [breeds, setBreeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(
          `https://api.thecatapi.com/v1/breeds?limit=10&page=${currentPage}`,
          {
            headers: {
              "x-api-key":
                "live_HPvtNnVPu1A9xKut0K5qyf3W1PDYmtd0bF5cO9E4b91gexTeAIiryvgkuMhgSiqP",
            },
          }
        );
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching cat breeds:", error);
      }
    };

    fetchBreeds();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Breed</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {breeds.map((breed) => (
                <TableRow key={breed.id}>
                  <TableCell>{breed.name}</TableCell>
                  <TableCell>{breed.origin}</TableCell>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/breed/${breed.id}`}
                      variant="contained"
                    >
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            variant="outlined"
          >
            Previous Page
          </Button>
          <Typography variant="body1" mx={2}>
            Page {currentPage + 1}
          </Typography>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            variant="outlined"
          >
            Next Page
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default CatList;
