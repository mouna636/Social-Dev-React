import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineOppositeContentClasses,
  timelineItemClasses,
} from '@mui/lab';
import { Typography, Box, Paper } from '@mui/material';
import { FaBriefcase, FaFileAlt } from 'react-icons/fa';
import dayjs from '../../utils/dayjs';

const ExperienceTimeline = ({ experiences }) => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {experiences.map((exp, index) => (
        <TimelineItem key={index}>
          {/* Timeline Separator */}
          <TimelineSeparator>
            <TimelineDot color='primary'>
              <FaBriefcase />
            </TimelineDot>
            {index < experiences.length - 1 && <TimelineConnector />}
          </TimelineSeparator>

          {/* Timeline Content */}
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              {/* Job Title */}
              <Typography
                variant='h6'
                component='span'
                sx={{ fontWeight: 'bold' }}
              >
                {exp.title}
              </Typography>

              {/* Company */}
              <Typography
                variant='subtitle1'
                sx={{ color: 'text.secondary', fontStyle: 'italic' }}
              >
                {exp.company}
              </Typography>
              {/* Dates */}
              <Typography color='text.secondary' sx={{ mb: 1 }}>
                {dayjs(exp.startDate).format('MMM YYYY')} -{' '}
                {exp.endDate
                  ? dayjs(exp.endDate).format('MMM YYYY')
                  : 'Present'}
              </Typography>

              {/* Description */}
              <Box display='flex' alignItems='center' gap={1} sx={{ mt: 1 }}>
                {/* <FaFileAlt size={16} color='#757575' /> */}
                <Typography color='text.secondary'>
                  {exp.description}
                </Typography>
              </Box>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default ExperienceTimeline;
