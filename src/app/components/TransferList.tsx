import React, {
  CSSProperties,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IStyles } from "../features/workflowV3/model/IStyles";

export interface IColumn {
  name: string;
  field: string;
  width?: string;
  align?: "left" | "right" | "center";
}

interface ITransferListItem {
  id: string | number;
  name: string;
  format?: string;
  type?: string;
  description?: string;
  assigned: boolean;
  selected: boolean;
  position: number;
  [key: string]: string | number | boolean | Record<string, any>;
}

interface TransferListProps {
  uniqueIdField?: string;
  initialItems: any[];
  assignedItems: any[];
  onItemsChange: (updatedItems: any[]) => void;
  availableTitle?: string;
  assignedTitle?: string;
  searchPlaceholder?: string;
  leftPanelHeader?: string;
  rightPanelHeader?: string;
  addSelectedTooltip?: string;
  addAllTooltip?: string;
  removeSelectedTooltip?: string;
  removeAllTooltip?: string;
  moveUpTooltip?: string;
  moveDownTooltip?: string;
  styles?: CSSProperties;
  columns?: IColumn[];
}

interface DivStyles {
  leftPanelContainer: React.CSSProperties;
  rightPanelContainer: React.CSSProperties;
}

const defaultColumns = [
  { name: "NAME", field: "name", width: "50%" },
  { name: "FORMAT", field: "format", width: "50%" },
];

const fileStyles = (styles: CSSProperties): IStyles => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      backgroundColor: "white",
    },
    gridContainer: {
      display: "flex-left",
      alignContent: "start",
      flexDirection: "row",
    },
    listContainer: {
      width: "100%",
      height: 380,
      overflowX: "hidden",
      overflowY: "scroll",
      ...styles,
    },
    cardHeader: {
      px: 2,
      py: 1,
      backgroundColor: "#F5F5F5",
      position: "sticky",
      top: 0,
      left: 0,
      zIndex: 999,
    },
    list: {
      "&& .Mui-selected, && .Mui-selected:hover": {
        bgcolor: "rgba(142, 216, 248, 0.5)",
      },
      "& .MuiListItemButton-root:hover": {
        backgroundColor: "rgba(142, 216, 248, 0.5)",
      },
    },
    itemTextContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    columnText: {
      padding: "0",
      margin: "0",
      paddingRight: "10px",
      boxSizing: "border-box",
      textAlign: "left",
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    iconButton: {
      color: "#000",
      border: "solid 2px",
      scale: "50%",
    },
    listButtonItem: {
      border: "2px solid #f1f1f1",
      padding: "6px",
      margin: "2px",
      width: "99%",
      boxSizing: "border-box",
      color: "#000000DE",
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    headerColumn: {
      flex: 1,
      textAlign: "left",
      fontWeight: "bold",
      paddingRight: "10px",
    },
  };
};

const divStyles = (): DivStyles => {
  return {
    leftPanelContainer: {
      width: "100%",
      paddingTop: "2px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "end",
      marginBottom: "16px",
    },
    rightPanelContainer: {
      width: "100%",
      paddingTop: "2px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "end",
      marginBottom: "16px",
    },
  };
};

export const TransferList: React.FC<TransferListProps> = ({
  uniqueIdField,
  initialItems,
  onItemsChange,
  assignedItems,
  availableTitle = "Available",
  assignedTitle = "Assigned",
  searchPlaceholder = "Search",
  addSelectedTooltip = "Add Selected",
  addAllTooltip = "Add All",
  removeSelectedTooltip = "Remove Selected",
  removeAllTooltip = "Remove All",
  moveUpTooltip = "Move Up",
  moveDownTooltip = "Move Down",
  styles,
  columns = defaultColumns,
}) => {
  const defaultStyles = useMemo(() => fileStyles(styles), [styles]);
  const defaultDivStyles = useMemo(() => divStyles(), []);
  const [items, setItems] = useState<ITransferListItem[]>([]);
  const [searchTermLeft, setSearchTermLeft] = useState<string>("");
  const [searchTermRight, setSearchTermRight] = useState<string>("");

  useLayoutEffect(() => {
    const processedItems: ITransferListItem[] = initialItems.map(
      (item, index) => {
        const selectedItem = assignedItems?.find(
          (assignItem) => assignItem[uniqueIdField] === item[uniqueIdField]
        );
        return {
          ...item,
          id: item?.[uniqueIdField] || item.id || index,
          assigned: selectedItem ? true : false,
          selected: false,
          position: selectedItem ? selectedItem.position ?? index : -1,
        };
      }
    );
    setItems(processedItems);
  }, [initialItems, assignedItems, uniqueIdField]);

  const sortedAssignedItems = useCallback((dataItems: ITransferListItem[]) => {
    const assignedDataItems = dataItems.filter((item) => item.assigned);
    const sortedAssigned = assignedDataItems.sort(
      (a, b) => a.position - b.position
    );
    return sortedAssigned;
  }, []);

  const updateItems = useCallback(
    (dataItems: ITransferListItem[]) => {
      const sortedItems = sortedAssignedItems(dataItems);
      setItems(dataItems);
      onItemsChange(sortedItems);
    },
    [onItemsChange, sortedAssignedItems]
  );

  const handleAllRight = useCallback(() => {
    const assignedCount = items.filter((item) => item.assigned).length;
    let position = assignedCount === 0 ? 0 : assignedCount;
    const prevItems = [...items];
    const updatedListItems = prevItems.map((item) => {
      if (!item.assigned) {
        return {
          ...item,
          assigned: true,
          selected: false,
          position: position++,
        };
      } else {
        return { ...item };
      }
    });
    updateItems(updatedListItems);
  }, [items, updateItems]);

  const handleCheckedRight = useCallback(() => {
    const assignedCount = [...items].filter((item) => item.assigned).length;
    let position = assignedCount === 0 ? 0 : assignedCount;
    const updatedListItems = items.map((item) => {
      if (!item.assigned && item.selected) {
        return {
          ...item,
          assigned: true,
          selected: false,
          position: position++,
        };
      } else {
        return { ...item };
      }
    });
    updateItems(updatedListItems);
  }, [items, updateItems]);

  const handleCheckedLeft = useCallback(() => {
    const unassignedSelected = [...items].filter(
      (item) => item.assigned && item.selected
    );
    const assignedButNotSelected = items.filter(
      (item) => item.assigned && !item.selected
    );

    const reorderedAssigned = assignedButNotSelected
      .sort((a, b) => a.position - b.position)
      .map((item, index) => ({ ...item, position: index }));

    const updatedListItems = [...items].map((item) => {
      const foundInReordered = reorderedAssigned.find((f) => f.id === item.id);
      if (foundInReordered) {
        return { ...foundInReordered };
      } else if (unassignedSelected.some((f) => f.id === item.id)) {
        return { ...item, assigned: false, selected: false, position: -1 };
      } else {
        return { ...item };
      }
    });
    updateItems(updatedListItems);
  }, [items, updateItems]);

  const handleAllLeft = useCallback(() => {
    const updatedListItems = [...items].map((item) => {
      return { ...item, assigned: false, selected: false, position: -1 };
    });
    updateItems(updatedListItems);
  }, [items, updateItems]);

  const swapAssignedItems = useCallback(
    (
      items: ITransferListItem[],
      direction: "up" | "down"
    ): ITransferListItem[] => {
      const assigned = items
        .filter((item) => item.assigned)
        .sort((a, b) => a.position - b.position);
      const selectedIndex = assigned.findIndex((item) => item.selected);

      const targetIndex =
        direction === "up" ? selectedIndex - 1 : selectedIndex + 1;

      if (
        selectedIndex === -1 ||
        targetIndex < 0 ||
        targetIndex >= assigned.length
      ) {
        return items;
      }

      const swapped = [...assigned];
      const itemA = swapped[selectedIndex];
      const itemB = swapped[targetIndex];

      swapped[selectedIndex] = { ...itemB, position: itemA.position };
      swapped[targetIndex] = { ...itemA, position: itemB.position };

      return items.map((item) => {
        const updated = swapped.find((s) => s.id === item.id);
        return updated ?? item;
      });
    },
    []
  );

  const handleUp = useCallback(() => {
    updateItems(swapAssignedItems(items, "up"));
  }, [items, swapAssignedItems, updateItems]);

  const handleDown = useCallback(() => {
    updateItems(swapAssignedItems(items, "down"));
  }, [items, swapAssignedItems, updateItems]);

  const handleSearchLeft = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTermLeft(e.target.value.toLowerCase());
    },
    []
  );

  const handleSearchRight = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTermRight(e.target.value.toLowerCase());
    },
    []
  );

  const handleItemClick = useCallback((clickedItem: ITransferListItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === clickedItem.id) {
          return { ...item, selected: !item.selected };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  }, []);

  const renderHeader = () => (
    <Box sx={defaultStyles.headerContainer}>
      {columns.map((column) => (
        <Typography
          key={column.field}
          sx={{
            ...defaultStyles.headerColumn,
            textAlign: column.align || "left",
            flex: column.width || "1",
          }}
        >
          {column.name}
        </Typography>
      ))}
    </Box>
  );

  const customList = (listItems: ITransferListItem[]) => (
    <Paper sx={defaultStyles.listContainer}>
      <CardHeader sx={defaultStyles.cardHeader} subheader={renderHeader()} />
      <Divider />
      <List dense component="div" role="list" sx={defaultStyles.list}>
        {listItems.map((item: ITransferListItem) => (
          <ListItemButton
            key={item.id}
            role="listitem"
            onClick={() => handleItemClick(item)}
            sx={[
              defaultStyles.listButtonItem,
              {
                backgroundColor: item.selected
                  ? "rgba(142, 216, 248, 0.5)"
                  : "rgba(0, 0, 0, 0.00)",
              },
            ]}
          >
            <ListItemText>
              <Box sx={defaultStyles.itemTextContainer}>
                {columns.map((column) => (
                  <Typography
                    key={column.field}
                    sx={{
                      ...defaultStyles.columnText,
                      textAlign: column.align || "left",
                      flex: column.width || "1",
                    }}
                  >
                    {item[column.field] !== undefined &&
                    item[column.field] !== null
                      ? String(item[column.field])
                      : "-"}
                  </Typography>
                ))}
              </Box>
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );

  const leftPanelItems = items.filter((item) =>
    searchTermLeft.length > 0
      ? item.name.toLowerCase().includes(searchTermLeft) && !item.assigned
      : !item.assigned
  );

  const rightPanelItems = items
    .filter((item) =>
      searchTermRight.length > 0
        ? item.name.toLowerCase().includes(searchTermRight) && item.assigned
        : item.assigned
    )
    .sort((a, b) => a.position - b.position);

  const selectedInLeft = items.filter(
    (item) => !item.assigned && item.selected
  );
  const selectedInRight = items.filter(
    (item) => item.assigned && item.selected
  );

  let disableUp = true;
  let disableDown = true;

  if (selectedInRight.length === 1) {
    const selectedItem = selectedInRight[0];
    const selectedIndex = rightPanelItems.findIndex(
      (item) => item.id === selectedItem.id
    );

    if (selectedIndex > 0) {
      disableUp = false;
    }
    if (selectedIndex < rightPanelItems.length - 1) {
      disableDown = false;
    }
  }

  return (
    <Box sx={defaultStyles.root}>
      <Box sx={defaultStyles.gridContainer}>
        <Grid container columns={{ xs: 12, sm: 8, md: 8 }}>
          <Grid container justifyContent="spaceBetween" alignItems="center">
            <Grid item style={{ padding: "16px", width: "48%" }}>
              <div style={defaultDivStyles.leftPanelContainer}>
                <div>
                  <Typography
                    variant="subtitle1"
                    color="#00000099"
                    fontWeight="700"
                    textAlign="left"
                  >
                    {availableTitle}
                  </Typography>
                </div>
                <div>
                  <TextField
                    size="small"
                    variant="standard"
                    placeholder={searchPlaceholder}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleSearchLeft}
                  />
                </div>
              </div>
              {customList(leftPanelItems)}
            </Grid>
            <Grid item style={{ width: "4%" }}>
              <Grid
                container
                spacing={1}
                direction="column"
                alignItems="bottom"
                style={{
                  alignItems: "center",
                }}
              >
                <Tooltip title={addAllTooltip} placement="right" arrow>
                  <span>
                    <IconButton
                      sx={defaultStyles.iconButton}
                      onClick={handleAllRight}
                      size="large"
                      aria-label="move all right"
                      color="inherit"
                      disabled={leftPanelItems.length === 0}
                    >
                      <KeyboardDoubleArrowRightOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>

                <Tooltip title={addSelectedTooltip} placement="right" arrow>
                  <span>
                    <IconButton
                      sx={defaultStyles.iconButton}
                      onClick={handleCheckedRight}
                      size="large"
                      aria-label="move selected right"
                      color="inherit"
                      disabled={selectedInLeft.length === 0}
                    >
                      <KeyboardArrowRightOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>

                <Tooltip title={removeSelectedTooltip} placement="right" arrow>
                  <span>
                    <IconButton
                      sx={defaultStyles.iconButton}
                      onClick={handleCheckedLeft}
                      size="large"
                      aria-label="move selected left"
                      color="inherit"
                      disabled={selectedInRight.length === 0}
                    >
                      <KeyboardArrowLeftOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>

                <Tooltip title={removeAllTooltip} placement="right" arrow>
                  <span>
                    <IconButton
                      sx={defaultStyles.iconButton}
                      onClick={handleAllLeft}
                      size="large"
                      aria-label="move all left"
                      color="inherit"
                      disabled={rightPanelItems.length === 0}
                    >
                      <KeyboardDoubleArrowLeftOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={moveUpTooltip} placement="right" arrow>
                  <span>
                    <IconButton
                      sx={defaultStyles.iconButton}
                      onClick={handleUp}
                      size="large"
                      aria-label="move up"
                      color="inherit"
                      disabled={disableUp}
                    >
                      <KeyboardArrowUpIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={moveDownTooltip} placement="right" arrow>
                  <span>
                    <IconButton
                      sx={defaultStyles.iconButton}
                      onClick={handleDown}
                      size="large"
                      aria-label="move down"
                      color="inherit"
                      disabled={disableDown}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item style={{ padding: "16px", width: "48%" }}>
              <div style={defaultDivStyles.rightPanelContainer}>
                <div>
                  <Typography
                    variant="subtitle1"
                    color="#00000099"
                    fontWeight="700"
                    textAlign="right"
                  >
                    {assignedTitle}
                  </Typography>
                </div>
                <div>
                  <TextField
                    size="small"
                    variant="standard"
                    placeholder={searchPlaceholder}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleSearchRight}
                  />
                </div>
              </div>
              {customList(rightPanelItems)}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TransferList;
