import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { avatars, candidates } from './CandidateGrid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

const formInputStyle = {
  marginTop: '1rem',
  marginBottom: '1rem',
};

const CreateModal = ({
  opened,
  headinglw,
  heading,
  onCancelClick,
  updateCards,
}) => {
  console.log(opened, 'opened from modal');
  const [open, setOpen] = useState(opened);
  const [stageVal, setStageVal] = useState('');
  const [avatarVal, setAvatarVal] = useState(avatars[0]);
  const [errors, setErrors] = useState(null);
  const handleClose = () => {
    setOpen(false);
    onCancelClick(false);
  };

  const createNewRecord = () => {
    const nameInput = document.getElementById('name');
    const locationInput = document.getElementById('location');
    const dateInput = document.getElementById('date');

    if (
      nameInput.value &&
      locationInput.value &&
      dateInput.value &&
      stageVal &&
      avatarVal
    ) {
      console.log('creating record');
      const record = {
        id: candidates.length,
        candidate_name: nameInput.value,
        location: locationInput.value,
        data_applied: dateInput.value,
        stage: [stageVal],
        photo: avatarVal,
      };
      const parsedStorage = JSON.parse(localStorage.getItem('candidates'));

      const updatedCandidates = [...parsedStorage, record];

      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
      updateCards(record);
      //   setCards((cards) => [...cards, record]);

      handleClose();
    } else {
      setErrors('Fill all the fields');
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          sx={{ fontWeight: 'bold' }}
        >
          Create a new record(candidate)
        </Typography>
        {errors && (
          <Typography
            id='modal-modal-title'
            variant='p'
            component='p'
            sx={{
              fontSize: '12px',
              color: 'red',
              marginTop: '0.5rem',
              fontWeight: 'bold',
            }}
          >
            {errors}
          </Typography>
        )}

        <div>
          <FormControl fullWidth sx={formInputStyle}>
            <InputLabel>Name</InputLabel>
            <Input id='name' type='text' />
          </FormControl>
          <FormControl fullWidth sx={formInputStyle}>
            <InputLabel>Location</InputLabel>
            <Input id='location' type='text' />
          </FormControl>
          <FormControl fullWidth sx={formInputStyle}>
            <Input type='date' id='date' placeholder='Date Applied' />
          </FormControl>
          <FormControl fullWidth sx={formInputStyle}>
            <InputLabel id='demo-simple-select-label'>Stage</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='stage'
              value={stageVal}
              label='Stage'
              onChange={(e) => setStageVal(e.target.value)}
            >
              <MenuItem value={headinglw}>{heading}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={formInputStyle}>
            <InputLabel id='demo-simple-select-label'>Avatar</InputLabel>
            <Select
              labelId='avatar-label'
              id='avatar'
              value={avatarVal}
              label='Stage'
              onChange={(e) => setAvatarVal(e.target.value)}
            >
              {avatars.map((el, id) => {
                return (
                  <MenuItem value={el} key={id}>
                    <img src={el} alt='' style={{ width: '30px' }} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
            }}
          >
            <Button variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' onClick={createNewRecord}>
              Create
            </Button>
          </FormControl>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateModal;
