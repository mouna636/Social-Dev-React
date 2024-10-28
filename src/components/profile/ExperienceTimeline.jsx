import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  timelineItemClasses,
} from '@mui/lab';
import { FaBriefcase } from 'react-icons/fa';
import ExperienceCard from './ExperienceCard';
const ExperienceTimeline = ({
  experiences,
  onEdit,
  onDelete,
  isCurrentUser,
}) => {
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

          <ExperienceCard
            experience={exp}
            onEdit={onEdit}
            onDelete={onDelete}
            isCurrentUser={isCurrentUser}
          />
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default ExperienceTimeline;
