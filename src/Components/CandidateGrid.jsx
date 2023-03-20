import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CandidateCard from './CandidateCard';
import avatara from '../assets/avatara.png';
import avatarb from '../assets/avatarb.png';
import avatarc from '../assets/avatarc.png';
import avatard from '../assets/avatard.png';
import avatare from '../assets/avatare.png';
import avatarf from '../assets/avatarf.png';
import avatarg from '../assets/avatarg.png';
import avatarh from '../assets/avatarh.png';
import avatari from '../assets/avatari.png';
import avatarj from '../assets/avatarj.png';
import avatark from '../assets/avatark.png';
import avatarl from '../assets/avatarl.png';
import ColDefiner from './ColDefiner';
import AddIcon from '@mui/icons-material/Add';
import CreateModal from './CreateModal';

export const avatars = [
  avatara,
  avatarb,
  avatarc,
  avatard,
  avatare,
  avatarf,
  avatarg,
  avatarh,
  avatari,
  avatarj,
  avatark,
  avatarl,
];

export const candidates = [
  {
    id: 0,

    candidate_name: 'Shaqran',
    photo: avatars[0],
    location: 'Kashmir',
    data_applied: '2022-04-22',
    stage: ['source'],
  },

  {
    id: 1,
    candidate_name: 'Nita',
    photo: avatars[1],
    location: 'Hyderabad',
    data_applied: '2022-01-12',
    stage: ['source'],
  },
  {
    id: 2,
    candidate_name: 'Vivek',
    photo: avatars[2],
    location: 'Sahranpur',
    data_applied: '2022-04-23',
    stage: ['source'],
  },
  {
    id: 3,

    candidate_name: 'Ilyas',
    photo: avatars[3],
    location: 'Faridabad',
    data_applied: '2022-05-01',
    stage: ['source'],
  },
  {
    id: 4,

    candidate_name: 'Sanjay',
    photo: avatars[4],
    location: 'Chennai',
    data_applied: '2022-4-22',
    stage: ['source'],
  },
  {
    id: 5,
    candidate_name: 'Arjun',
    photo: avatars[11],
    location: 'Ambala',
    data_applied: '2022-10-09',
    stage: ['source'],
  },
  {
    id: 6,
    candidate_name: 'Tsering',
    photo: avatars[5],
    location: 'Assam',
    data_applied: '2023-01-01',
    stage: ['source'],
  },

  // {
  //   id: 6,

  //   candidate_name: 'Aditya',
  //   photo: avatars[6],
  //   location: 'Delhi',
  //   data_applied: '23-04-2022',
  //   stage: ['source'],
  // },
  // {
  //   id: 7,

  //   candidate_name: 'Salman',
  //   photo: avatars[7],
  //   location: 'Mumbai',
  //   data_applied: '23-04-2022',
  //   stage: ['source'],
  // },
  // {
  //   id: 8,

  //   candidate_name: 'Prachi',
  //   photo: avatars[8],
  //   location: 'Uttarkhand',
  //   data_applied: '23-04-2022',
  //   stage: ['source'],
  // },
  // {
  //   id: 9,

  //   candidate_name: 'Hina',
  //   photo: avatars[9],
  //   location: 'Lucknow',
  //   data_applied: '23-04-2022',
  //   stage: ['source'],
  // },
  // {
  //   id: 10,

  //   candidate_name: 'Janvi',
  //   photo: avatars[10],
  //   location: 'West Bengal',
  //   data_applied: '23-04-2022',
  //   stage: ['source'],
  // },
];

const CandidateGrid = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeunload', clearStorage);
    if (!localStorage.getItem('candidates')) {
      localStorage.setItem('candidates', JSON.stringify(candidates));
    }
    return () => window.removeEventListener('beforeunload', clearStorage);
  }, []);

  const clearStorage = () => {
    localStorage.removeItem('candidates');
  };
  const handleOpen = () => setOpen(true);

  const closeFromModal = (val) => setOpen(val);

  return (
    <section className='' style={{ margin: '3rem' }}>
      <div
        sx={{ justifyContent: 'center' }}
        style={{ display: 'flex', gap: '1rem' }}
      >
        <div item className='col' style={{ width: '13rem' }}>
          <h3 className='col-heading'>Source</h3>
          <div id='source' className='col-inner'>
            {candidates &&
              candidates.map((el, id) => {
                return <CandidateCard key={id} data={el} heading='Source' />;
              })}

            <Button
              onClick={handleOpen}
              variant='outlined'
              className=''
              sx={{ borderRadius: '50%', width: '60px', height: '60px' }}
            >
              <AddIcon fontSize='large' />
            </Button>
          </div>
        </div>
        <ColDefiner heading='Applied' />
        <ColDefiner heading='In Touch' />
        <ColDefiner heading='Interview' />
        <ColDefiner heading='Hired' />
        <ColDefiner heading='Rejected' />
      </div>
      {/* modal */}
      {open && (
        <CreateModal
          opened={true}
          headinglw={'source'}
          heading={'Source'}
          onCancelClick={closeFromModal}
          updateCards={(record) => candidates.push(record)}
        />
      )}
    </section>
  );
};

export default CandidateGrid;
