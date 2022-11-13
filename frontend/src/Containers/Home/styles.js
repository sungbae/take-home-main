import MuiListItem from "@material-ui/core/ListItem"
import { withStyles } from "@material-ui/core/styles"
import styled from "styled-components"

export const HomeWrapper = styled.div`
  width: 75vw;
  height: 90vh;
  display: flex;
  flex-flow: column;
  margin: auto;
  padding: 8px;
`

export const ErrorMessage = styled.div`
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
`

export const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "steelblue",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
    },
    "&$selected:hover": {
      backgroundColor: "steelblue",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
      cursor: "pointer",
    },
    "&:hover": {
      backgroundColor: "lightgray",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
      cursor: "pointer",
    },
  },
  selected: {},
})(MuiListItem)
