import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useDrag } from 'react-dnd';

const deleteStyles = {
  position: 'absolute',
  top: '2px',
  right: '8px',
  backgroundColor: 'transparent',
  border: '0px',
  fontWeight: 'semibold',
  fontSize: '16px',
  cursor: 'pointer',
};

const CandidateCard = ({ data, heading, removeCard }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'card',
      item: { id: data.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [data]
  );

  return (
    <Card
      ref={drag}
      sx={{
        width: '80%',
        maxWidth: '90%',
        maxHeight: '150px',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        border:
          data.stage.includes('hired') && heading === 'Hired'
            ? '1px solid green'
            : data.stage.includes('rejected') &&
              heading === 'Rejected' &&
              '1px solid red',
      }}
    >
      <CardContent sx={{ maxHeight: '70%' }}>
        {heading !== 'Source' && (
          <button
            className=''
            style={deleteStyles}
            onClick={() => {
              removeCard(data.id);
            }}
          >
            X
          </button>
        )}

        <CardMedia
          component='img'
          alt='green iguana'
          sx={{
            height: '40px',
            width: '40px',
          }}
          image={data.photo}
        />
        <Typography
          gutterBottom
          variant='h6'
          component='div'
          sx={{ fontSize: '14px', marginBottom: 0, marginTop: '5px' }}
        >
          {data.candidate_name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ marginTop: '0' }}
        >
          {data.location}
        </Typography>

        <Typography
          variant='body2'
          color='text.secondary'
          style={{ fontSize: '12px' }}
        >
          Date Appl: {data.data_applied}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(CandidateCard);
