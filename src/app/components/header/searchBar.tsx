import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import commonStore from "../../features/home1/commonStore";
// import useAxios from "../api/useAxios";
// import { GLOBAL_SEARCH } from "../api/apiEndPoints";
// import { SolutionConfig } from "../../api/types";

const SearchBar = () => {
  const [keyword] = useState<string>("");
  const [placeHolder] = useState<string>("");

  // const [solution, setSolution] = useState<SolutionConfig>(
  //   commonStore.getSolution()
  // );
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<any>();

  const [collections] = useState<any[]>([]);

  // const { response, operation } = useAxios();

  // useEffect(() => {
  //   const subscription = commonStore
  //     .getState()
  //     .subscribe((state: CommonStore) => {
  //       const { placeHolder, keyword, solution } = state;
  //       setPlaceHolder(placeHolder);
  //       setKeyword(keyword);
  //       setSolution(solution);
  //     });
  //   return () => subscription.unsubscribe();
  // }, []);

  // useEffect(() => {
  //   if (solution && keyword.length > 0) {
  //     const data: any = {
  //       applicationKey: solution.applicationKey,
  //       solutionKey: solution.solutionKey,
  //       companyId: solution.companyId,
  //       searchCriteria: keyword,
  //     };
  //     operation({
  //       method: "POST",
  //       url: GLOBAL_SEARCH,
  //       headers: {
  //         accept: "*/*",
  //       },
  //       data: data,
  //     });
  //   }
  // }, [solution, keyword]);

  // useEffect(() => {
  //   if (response) {
  //     const assets = [];
  //     const assetTypes = [];
  //     const solutions = [];
  //     response.forEach((item: any) => {
  //       if (item.collection === "asset") {
  //         const obj = {
  //           collection: item.collection,
  //           name: item.assetName,
  //           type: item.assetCategory,
  //           itemKey: item.assetKey,
  //         };
  //         assets.push(obj);
  //       } else if (item.collection === "assetType") {
  //         const obj = {
  //           collection: item.collection,
  //           name: item.label,
  //           type: item.type,
  //           itemKey: "",
  //         };
  //         assetTypes.push(obj);
  //       } else if (item.collection === "solutionConfiguration") {
  //         const obj = {
  //           collection: item.collection,
  //           name: item.solutionName,
  //           type: item.version,
  //           itemKey: item.solutionKey,
  //         };
  //         solutions.push(obj);
  //       }
  //     });
  //     const _collections = [];

  //     if (assets.length > 0) {
  //       _collections.push({
  //         collectionName: "Asset",
  //         items: assets,
  //       });
  //     }
  //     if (assetTypes.length > 0) {
  //       _collections.push({
  //         collectionName: "Asset Type",
  //         items: assetTypes,
  //       });
  //     }
  //     if (solutions.length > 0) {
  //       _collections.push({
  //         collectionName: "Solution",
  //         items: solutions,
  //       });
  //     }
  //     setCollections(_collections);
  //     setOpen(true);
  //   }
  // }, [response]);

  const handleSearch = (event: { target: { value: string } }) => {
    const value = event && event.target.value.replace(/[^a-zA-Z0-9\s]/, "");
    commonStore.updateKeyword(value);
  };
  const handleClear = () => {
    commonStore.updateKeyword("");
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "99px",
    boxSizing: "border-box",
    backgroundColor: alpha("#E8EAF6", 0.8),
    "&:hover": {
      backgroundColor: "#E8EAF6",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "517px !important",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "320px",
    },
    letterSpacing: "0.15px",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    fontSize: "16px",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "30ch",
      },
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      onClick={(e) => {
        setAnchorEl(e.currentTarget);
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.56)" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={placeHolder.length > 0 ? placeHolder : "Search"}
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearch}
          value={keyword}
          sx={{ flexGrow: 1 }}
          endAdornment={
            <IconButton
              title="clear"
              sx={{
                visibility: keyword.length ? "visible" : "hidden",
                marginLeft: "110px",
              }}
              onClick={handleClear}
            >
              <ClearIcon />
            </IconButton>
          }
        />
      </Search>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          width: "520px",
          marginTop: 1,
          maxHeight: 500,
        }}
        onClose={handleClose}
        MenuListProps={{
          style: {
            padding: 0,
          },
        }}
      >
        <>
          {collections.map((collection: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "center",
                  width: "520px",
                  padding: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    fontFamily: "Inter",
                  }}
                >
                  {`${collection.collectionName}`}
                </Typography>
                {collection.items.map((subItem: any, subIndex: number) => {
                  return (
                    <Box
                      key={subIndex}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        justifyContent: "center",
                        width: "520px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          color: "gray",
                          height: 40,
                          alignContent: "center",
                        }}
                      >
                        {`${subItem.name} - ${subItem.type}`}
                      </Typography>
                      {subIndex + 1 !== collection.items.length && (
                        <Divider orientation="horizontal" />
                      )}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </>
      </Menu>
    </Box>
  );
};

export default SearchBar;
