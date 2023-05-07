import { Box, Button, ButtonGroup } from '@mui/material';
import { Msg } from 'core/i18n';
import React from 'react';
import messageIds from 'features/calendar/l10n/messageIds';

interface AllAndNoneToggleProps {
  filterCategory: string;
  onClickAll: (value: string) => void;
  onClickNone: (value: string) => void;
}
const AllAndNoneToggle = ({
  filterCategory,
  onClickAll,
  onClickNone,
}: AllAndNoneToggleProps) => {
  return (
    <Box display="flex">
      <Button variant="text" onClick={() => onClickAll(filterCategory)}>
        <Msg id={messageIds.eventFilter.toggle.all} />
      </Button>
      <Button variant="text" onClick={() => onClickNone(filterCategory)}>
        <Msg id={messageIds.eventFilter.toggle.none} />
      </Button>
    </Box>
  );
};

export default AllAndNoneToggle;
