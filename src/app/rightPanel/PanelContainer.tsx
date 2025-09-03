import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import LoadingOverlay from '../common/components/utils/LoadingOverlay';


export interface IPanelContainerProps extends PropsWithChildren {
  onClose?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  label?: string;
  subHeader?: string;
  loading?: boolean;
}

const styles = {
  headerContainer: {
    alignContents: 'center',
    backgroundColor: '#f3f4f6',
    padding: '16px',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContents: 'center',
    color: '#1e417a',
  },
  headerTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    maxHeight: 'calc(100% - 60px)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '80%',
  },
  footer: {
    justifyContent: 'flex-end',
    p: 2,
  },
  subHeader: {
    color: 'red',
    fontSize: 'small',
    padding: '4px 0',
  },
  icon: {
    color: '#1e417a',
  },
  breadcrumbTypography: {
    fontSize: 'small',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
  },
};

export const PanelContainer: React.FC<IPanelContainerProps> = ({
  onClose,
  onSave,
  onDelete,
  onEdit,
  label,
  subHeader,
  loading,
  children,
}) => {
  return (
    <Stack height="100%" display="flex" flexDirection="column">
      {/* Header Section */}
      <LoadingOverlay loading={loading} />
      <Stack sx={styles.headerContainer}>
        <Stack sx={styles.header}>
          <Stack sx={styles.headerTitleContainer}>
            <Typography variant="h6">{label}</Typography>
          </Stack>
          <IconButton onClick={onClose} sx={styles.icon}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography sx={styles.subHeader}>{subHeader}</Typography>
      </Stack>

      {/* Main content area with flex-grow to push buttons to bottom */}
      <Stack sx={styles.content}>
        {/* Body Section */}
        <Stack sx={styles.body} flexGrow={1}>
          {children}
        </Stack>

        <Stack direction="row" spacing={2} sx={styles.footer}>
          {onDelete && (
            <Button
              sx={{ textTransform: 'capitalize' }}
              variant="contained"
              size="small"
              color="error"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
          {onEdit && (
            <Button
              sx={{ textTransform: 'capitalize', backgroundColor: '#1E417A' }}
              variant="contained"
              size="small"
              color="primary"
              onClick={onEdit}
            >
              Update
            </Button>
          )}
          {onSave && (
            <Button variant="contained" onClick={onSave}>
              Save
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
