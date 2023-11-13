import React from 'react';
import { AboutMeCard, ListOfExperiences } from '@/components';
import { Box } from '@mui/material';
import { GridCanvas } from '@/components/gridCanvas';

const Home: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <ListOfExperiences />
        </div>
        <AboutMeCard />
      </Box>
      <Box
        sx={{
          width: '50vw',
        }}
      >
        <GridCanvas />
      </Box>
    </Box>
  );
};

export default Home;
