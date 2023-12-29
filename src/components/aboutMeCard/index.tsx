import './aboutMeCard.css';
import React from 'react';
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

const backgroundImage = '/images/moxin-autumn-river-1.png'; // Update the path accordingly

// TODO: Move these to a theme file
const defaultBgColor = '#58202076';
const defaultBorderColor = '2px  solid #ed636377';

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
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',

          border: '2px  solid black',
        }}
        className="card"
      >
        <CardHeader
          title="HELLO THERE!"
          sx={{
            color: 'white',
            font: 'monospace',
            fontWeight: 'bold',
            textShadow: '2px 2px 2px maroon',
          }}
        />
        <CardMedia
          component="img"
          image={profileImage}
          sx={{
            boxShadow: 2,
            borderRadius: 6,
            border: defaultBorderColor,
            objectFit: 'contain',
            marginBlock: 1,
            maxWidth: 250,
            margin: 'auto',
            marginTop: 2,
            marginBottom: 2,
          }}
        />
        <CardContent
          sx={{
            backgroundColor: defaultBgColor,
            borderRadius: 3,
            color: 'white',
            textShadow: '2px 2px 2px maroon',
            border: defaultBorderColor,
          }}
        >
          <Typography variant="h5">My name is Daniel</Typography>
          <Typography variant="body1" flexWrap={'revert'}>
            I am a 4th year Computer Science student at NTNU, Trondheim, and
            also a big fan of functional programming.
          </Typography>
          <Typography variant="body1"></Typography>
          <Link href={githubURL} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" color="warning" sx={{ marginTop: 4 }}>
              Visit My GitHub
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};
