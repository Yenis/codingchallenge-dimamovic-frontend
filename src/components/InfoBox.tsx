import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

export const InfoBubble: React.FC<{ message: string }> = (props) => {
  return (
    <div>
      <Tooltip title={props.message}>
        <InfoIcon color='primary' />
      </Tooltip>
    </div>
  );
}
