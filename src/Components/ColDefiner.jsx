import React, { memo, useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { useDrop } from 'react-dnd';
import CandidateCard from './CandidateCard';
import AddIcon from '@mui/icons-material/Add';
import CreateModal from './CreateModal';

const ColDefiner = ({ heading }) => {
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const headinglw = heading.toLowerCase().replace(/ +/g, '');

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'card',
      drop: (item) => addCardToCol(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [cards]
  );

  const addCardToCol = useCallback(
    (id) => {
      const candidatesFromLs = JSON.parse(localStorage.getItem('candidates'));
      const getCard = candidatesFromLs.filter((el) => el.id === id);
      console.log(cards.length);

      const toBeUpdCard = { ...getCard[0] };

      console.log(toBeUpdCard);

      const filteredLs = candidatesFromLs.filter(
        (el) => el.id !== getCard[0].id
      );
      const updatedCard = {
        ...toBeUpdCard,
        stage: [...toBeUpdCard.stage, headinglw],
      };
      const updatedLs = [...filteredLs, updatedCard];
      localStorage.setItem('candidates', JSON.stringify(updatedLs));
      if (cards.length > 0) {
        const exists = cards.some((item) => item.id === id);
        if (exists) return;
        else {
          setCards((cards) => [...cards, updatedCard]);
        }
      } else {
        setCards((cards) => [...cards, updatedCard]);
      }
    },
    [cards]
  );
  const handleOpen = () => setOpen(true);

  const closeFromModal = (val) => setOpen(val);

  return (
    <div className='col' style={{ fontFamily: 'Poppins', width: '13rem' }}>
      <h3 className='col-heading'>{heading}</h3>
      <div id={heading} className='col-inner' ref={drop}>
        {cards &&
          cards.map((el, id) => {
            return (
              <CandidateCard
                key={id}
                data={el}
                heading={heading}
                removeCard={(id) =>
                  setCards((cards) => cards.filter((el) => el.id !== id))
                }
              />
            );
          })}

        <div>
          <Button
            onClick={handleOpen}
            variant='outlined'
            className=''
            sx={{ borderRadius: '50%', width: '60px', height: '60px' }}
          >
            <AddIcon fontSize='large' />
          </Button>
          {/* modal */}
          {open && (
            <CreateModal
              opened={true}
              headinglw={headinglw}
              heading={heading}
              onCancelClick={closeFromModal}
              updateCards={(record) => setCards((cards) => [...cards, record])}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ColDefiner);
