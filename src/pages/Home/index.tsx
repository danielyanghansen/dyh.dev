import React from 'react';
import { AboutMeCard, ListOfExperiences } from '@/components';
import { Box } from '@mui/material';
import { GridCanvas } from '@/components/gridCanvas';

import './home.css';

const Home: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100dvw' }}>
      <Box className="listOfExperiencesBox">
        <ListOfExperiences />
      </Box>

      <Box className="aboutMeCardBox">
        <AboutMeCard />
      </Box>

      <GridCanvas />
    </Box>
  );
};

export default Home;
