import clsx from "clsx";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListSubheader,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";

// Эмуляция поискового запроса к серверу
import search from "./search";
import { useDebounce } from "./utils/useDebounce";

const useStyles = makeStyles(() => ({
  root: {},
  loader: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  noText: {
    textAlign: "center",
    fontFamily: "sans-serif",
    fontSize: "18px",
    fontWeight: "700",
  },
}));

function RegionsDialog(props) {
  const { className, ...other } = props;
  const classes = useStyles(props);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState("");

  const [results, setResults] = useState([]);

  const debouncedSearch = useDebounce(query, 200);

  useEffect(() => {
    setResults([]);
    setLoading(true);
    if (debouncedSearch) {
      search(debouncedSearch).then((data) => {
        setResults(data.map((item) => ({ ...item, selected: false })));
        setLoading(false);
      });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedSearch]);

  const onToggle = (index) => {
    setResults((results) => {
      const newResults = results.slice();
      newResults[index]["selected"] = !newResults[index].selected;
      return newResults;
    });
  };
  const onClose = () => {
    setResults([]);
    setQuery("");
    props.onClose();
  };
  const onAdd = () => {
    props.onAdd(selectedItems());
    onClose();
  };
  const selectedItems = () => {
    return results.filter((item) => item.selected);
  };

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      className={clsx(classes.root, className)}
      {...other}
    >
      <DialogTitle>Add a County</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </FormControl>
      </DialogContent>
      {debouncedSearch && loading && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
      {debouncedSearch && !loading && !results.length && (
        <div className={classes.noText}>
          <div>Nothing found</div>
        </div>
      )}
      <List>
        {results.map((item, index) => {
          const key = index + item.state + item.county;
          const labelId = `transfer-list-all-item-${key}-label`;
          return (
            <ListItem key={key} button onClick={() => onToggle(index)}>
              <ListItemIcon>
                <Checkbox
                  checked={item.selected}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText>{item.state}</ListItemText>
              <ListItemText>{item.county}</ListItemText>
            </ListItem>
          );
        })}
      </List>

      <DialogActions>
        <Button disabled={!selectedItems().length} onClick={onAdd}>
          ADD
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegionsDialog;
