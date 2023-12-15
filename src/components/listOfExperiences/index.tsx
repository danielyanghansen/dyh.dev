import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItemText,
  ListItemButton,
  ListSubheader,
  ListItemIcon,
  Collapse,
  Divider,
  Box,
  Link,
} from '@mui/material';

import {
  Computer,
  ExpandLess,
  ExpandMore,
  GitHub,
  School,
  Work,
} from '@mui/icons-material';

import DNV_GL from '@/assets/DNV GL.svg';
import NorskHelsenett from '@/assets/NorskHelsenett.png';
import NTNU from '@/assets/NTNU.png';
import OmegaPoint from '@/assets/OmegaPoint.png';
import Sportradar from '@/assets/Sportradar.png';
import Webkom from '@/assets/Webkom.png';

export const ListOfExperiences: React.FC = () => {
  const [openWork, setOpenWork] = useState(false);
  const handleWorkClick = (): void => {
    setOpenWork(!openWork);
  };

  const [openSchool, setOpenSchool] = useState(false);
  const handleSchoolClick = (): void => {
    setOpenSchool(!openSchool);
  };

  const [openProjects, setOpenProjects] = useState(false);
  const handleProjectsClick = (): void => {
    setOpenProjects(!openProjects);
  };

  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        height: 'auto',
        borderRadius: 4,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <Typography variant="h6" className="listOfExperiencesHeader">
          My experiences throughout the years
        </Typography>
      }
    >
      <ListItemButton onClick={handleSchoolClick}>
        <ListItemIcon>
          <School />
        </ListItemIcon>
        <ListItemText
          primary="Education"
          secondary="Everything I've been reading up on"
        />
        {openSchool ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSchool} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Divider />
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={NTNU} width={'35px'} />
            </ListItemIcon>
            <Box>
              <ListItemText
                primary="Norwegian University of Science and Technology (2020-2025)"
                secondary="Master of Science in Computer Science"
              />
              <ListItemText secondary="Specializing in Algorithms & Computers" />
            </Box>
          </ListItemButton>
        </List>

        <Divider />
      </Collapse>
      <Divider />
      <ListItemButton onClick={handleWorkClick}>
        <ListItemIcon>
          <Work />
        </ListItemIcon>
        <ListItemText
          primary="Work Experiences"
          secondary="What I've been doing the last few years"
        />
        {openWork ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openWork} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Divider />
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={NTNU} width={'35px'} />
            </ListItemIcon>
            <ListItemText
              primary="NTNU (Feb 2023 - Jun 2023)"
              secondary="Teaching Assistant for TDT4186 Operating Systems"
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={Sportradar} width={'35px'} />
            </ListItemIcon>
            <ListItemText
              primary="Sportradar AS (Summer 2023)"
              secondary="Summer Internship - Software Engineer"
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={OmegaPoint} width={'35px'} />
            </ListItemIcon>
            <ListItemText
              primary="OmegaPoint Norge (Summer 2023)"
              secondary="Summer Internship - Software Consultant at Patentstyret"
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={NTNU} width={'35px'} />
            </ListItemIcon>
            <ListItemText
              primary="NTNU (Sep 2023 - Dec 2023)"
              secondary="Teaching Assistant for TDT4258 Low Level Computing"
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={NTNU} width={'35px'} />
            </ListItemIcon>
            <ListItemText
              primary="NTNU (Sep 2022 - Dec 2022)"
              secondary="Teaching Assistant for IT1901 Informatics, Project 1"
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={NTNU} width={'35px'} />
            </ListItemIcon>
            <ListItemText
              primary="NTNU (Sep 2022 - Dec 2022)"
              secondary="Teaching Assistant for TDT4109 Information Technology, Introduction"
            />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={NorskHelsenett} width={'35px'} />
            </ListItemIcon>
            <ListItemText
              primary="Norsk Helsenett (Summer 2021)"
              secondary="Summer Internship - Software Engineer"
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={DNV_GL} width={'35px'} />
            </ListItemIcon>
            <ListItemText
              primary="DNV GL (Nov 2018 - Aug 2019)"
              secondary="Database Architect"
            />
          </ListItemButton>
        </List>

        <Divider />
      </Collapse>
      <Divider />
      <ListItemButton onClick={handleProjectsClick}>
        <ListItemIcon>
          <Computer />
        </ListItemIcon>
        <ListItemText
          primary="Projects and Experiences"
          secondary="I've got to do something in my free time too"
        />
        {openProjects ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProjects} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Divider />
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <img src={Webkom} width={'35px'} />
            </ListItemIcon>
            <Box>
              <ListItemText
                primary="Abakus Webkom (2020-2025)"
                secondary="Voluntary Organization work that improved the digital experience of our co-students"
              />
              <ListItemText secondary="Work done in " />
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <GitHub />
                <Link
                  href={'https://github.com/webkom'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography variant="body1">Webkom</Typography>
                </Link>
              </Box>
            </Box>
          </ListItemButton>
        </List>

        <Divider />
      </Collapse>
    </List>
  );
};
