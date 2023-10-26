import './aboutMeCard.css';
import React, { useState } from 'react';
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  Link,
} from '@mui/material';

const profileImage = 'https://avatars.githubusercontent.com/u/55885035?v=4';
const githubURL = 'https://github.com/danielyanghansen';

export const AboutMeCard: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Card
        sx={{
          borderRadius: 8,
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          width: 'auto',
          maxWidth: 400,
        }}
        className="card"
      >
        <CardHeader title="Hello there!" />
        <CardMedia
          component="img"
          image={profileImage}
          sx={{
            boxShadow: 2,
            borderRadius: 6,
            border: '3px dotted #c10ec7',
            objectFit: 'contain',
            marginBlock: 1,
            maxWidth: 300,
            margin: 'auto',
          }}
        />
        <CardContent>
          <Typography variant="h5">My name is Daniel</Typography>
          <Typography variant="body1" flexWrap={'revert'}>
            I am a 4th year Computer Science student at NTNU, Trondheim, and
            also a big fan of functional programming.
          </Typography>
          <Typography variant="body1"></Typography>
          <Link href={githubURL} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" color="secondary" sx={{ marginTop: 4 }}>
              Visit My GitHub
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};
