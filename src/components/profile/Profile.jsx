import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,

  Paper,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/userService';
import TransitionsModal from '../modal/TransitionsModal';
import ExperienceTimeline from './ExperienceTimeline';


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [experiences, setExperiences] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSaveExperience = async (experience) => {
    if (experience) {
      setExperiences((prevExperiences) => [...prevExperiences, experience]);
      try {
        const updatedUser = {
          ...user,
          experiences: [...experiences, experience],
        };
        console.log(updatedUser);

        await updateUser(updatedUser);
      } catch (e) {
        console.error('Error updating user:', e);
      }
      console.log(experience);

      // handleCloseModal();
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await getUserById(id);
        console.log(resp.data);

        setUser(resp.data);
        if (resp.data.experiences) setExperiences(resp.data.experiences);
      } catch (e) {
        console.error('Error fetching user:', e);
      }
    };
    getUser();
  }, [id]);

  const userx = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    location: 'San Francisco, CA',
    connections: '500+ connections',
    profilePic: 'https://via.placeholder.com/150',
    backgroundImg: 'https://via.placeholder.com/800x200',
    summary: `Experienced developer with a strong background in full stack development. Passionate about building scalable web applications and learning new technologies.`,
    experience: [
      {
        title: 'Senior Developer',
        company: 'Tech Corp',
        duration: 'Jan 2020 - Present',
        description:
          'Leading a team of developers to build scalable solutions for e-commerce businesses.',
      },
      {
        title: 'Junior Developer',
        company: 'Web Solutions',
        duration: 'Jan 2018 - Dec 2019',
        description:
          'Developed web applications for various clients using React and Node.js.',
      },
    ],
  };

  return (
    <Container maxWidth='lg'>
      {/* Header Section */}
      <Box>
        <img
          src={userx.backgroundImg}
          alt='background'
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <Avatar
          src={userx.profilePic}
          alt={userx.name}
          sx={{
            width: 120,
            height: 120,
            marginTop: '-60px',
            border: '3px solid white',
            marginLeft: '20px',
          }}
        />
        <Box sx={{ marginTop: '16px', marginLeft: '20px' }}>
          <Typography variant='h5'>
            {user?.firstname + ' ' + user?.lastname}
          </Typography>
          <Typography color='text.secondary'>{userx.jobTitle}</Typography>
          <Typography color='text.secondary'>
            {user?.state + ', ' + user?.country}
          </Typography>
          <Typography color='text.secondary'>{userx.connections}</Typography>
          <Button variant='outlined' sx={{ mt: 1 }}>
            Connect
          </Button>
        </Box>
      </Box>

      {/* Summary Section */}
      <Paper sx={{ padding: 2, marginTop: 3 }}>
        <Typography variant='h6'>About</Typography>
        <Typography color='text.secondary'>{user?.about}</Typography>
      </Paper>

      {/* Experience Section */}
      <Paper sx={{ padding: 2, marginTop: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant='h6'>Experience</Typography>
          <Button variant='contained' color='primary' onClick={handleOpenModal}>
            Add Experience
          </Button>
        </Box>
        <TransitionsModal
          open={openModal}
          onClose={handleCloseModal}
          onAdd={handleSaveExperience}
        />

        <ExperienceTimeline experiences={experiences} />

        {/* {experiences.map((exp, index) => (
          <Box key={index} sx={{ marginTop: 2 }}>
            <Typography variant='subtitle1'>{exp.title}</Typography>
            <Typography color='text.secondary'>{exp.company}</Typography>
            <Typography color='text.secondary'>
              {dayjs(exp.startDate).format('MMM YYYY')} -{' '}
              {dayjs(exp.endDate).format('MMM YYYY')}
            </Typography>
            <Typography color='text.secondary'>{exp.description}</Typography>
            {index < experiences.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))} */}
      </Paper>
    </Container>
  );
};

export default ProfilePage;
