import React from 'react';
import { TimelineContent } from '@mui/lab';
import { Typography, Box, Paper, IconButton } from '@mui/material';
import dayjs from '../../utils/dayjs';
import { Delete, Edit } from '@mui/icons-material';

const ExperienceCard = ({ experience, onEdit, onDelete, isCurrentUser }) => {
  return (
    <TimelineContent sx={{ py: '12px', px: 2 }}>
      <Paper elevation={2} sx={{ p: 2, position: 'relative' }}>
        {isCurrentUser && (
          <>
            <IconButton
              aria-label='edit'
              size='small'
              sx={{ position: 'absolute', top: 8, right: 36 }}
              onClick={() => onEdit(experience.id)}
            >
              <Edit fontSize='small' />
            </IconButton>

            <IconButton
              aria-label='edit'
              size='small'
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={() => onDelete(experience.id)}
            >
              <Delete fontSize='small' />
            </IconButton>
          </>
        )}

        {/* Job Title */}
        <Typography variant='h6' component='span' sx={{ fontWeight: 'bold' }}>
          {experience.title}
        </Typography>

        {/* Company */}
        <Typography
          variant='subtitle1'
          sx={{ color: 'text.secondary', fontStyle: 'italic' }}
        >
          {experience.company}
        </Typography>
        {/* Dates */}
        <Typography color='text.secondary' sx={{ mb: 1 }}>
          {dayjs(experience.startDate).format('MMM YYYY')} -{' '}
          {experience.endDate
            ? dayjs(experience.endDate).format('MMM YYYY')
            : 'Present'}
        </Typography>

        {/* Description */}
        <Box display='flex' alignItems='center' gap={1} sx={{ mt: 1 }}>
          <Typography color='text.secondary'>
            {experience.description}
          </Typography>
        </Box>
      </Paper>
    </TimelineContent>
  );
};

export default ExperienceCard;
