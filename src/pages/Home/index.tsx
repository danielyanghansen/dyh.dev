import React from 'react';
import { AboutMeCard, ListOfExperiences } from '@/components';
import { Box } from '@mui/material';

const Home: React.FC = () => {
  return (
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
  );
};

export default Home;
