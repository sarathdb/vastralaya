import { Drawer } from '@mui/material';
import React from 'react';
import { IPanelContainerProps, PanelContainer } from './PanelContainer';

export interface IBaseRightPanel extends IPanelContainerProps {
  drawerOpen: boolean;
  onClose: () => void;
}

const styles = {
  drawer: {
    width: '40%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
};

export const BaseRightPanel: React.FC<IBaseRightPanel> = (props) => {
  const {
    drawerOpen,
    onClose,
    onSave,
    onEdit,
    onDelete,
    label,
    subHeader,
    children,
  } = props;
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={onClose}
      PaperProps={{ sx: styles.drawer }}
    >
      <PanelContainer
        label={label}
        onSave={onSave}
        onEdit={onEdit}
        onDelete={onDelete}
        onClose={onClose}
        subHeader={subHeader}
      >
        {children}
      </PanelContainer>
    </Drawer>
  );
};
