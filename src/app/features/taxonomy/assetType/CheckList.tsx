import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

import CheckIcon from "@mui/icons-material/Check";

interface CheckListItem {
  id: string;
  name: string;
}

interface CheckListProps {
  title: string;
  items: CheckListItem[];
  count?: number;
}

export const CheckList: React.FC<CheckListProps> = ({
  title,
  items,
  count,
}) => (
  <>
    <Typography variant="caption" color="text.secondary" gutterBottom>
      {title} ({count ?? items.length})
    </Typography>
    <List dense disablePadding>
      {items.map((item) => (
        <ListItem key={item.id} sx={{ pl: 0 }}>
          <ListItemIcon sx={{ minWidth: 30 }}>
            <CheckIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  </>
);
