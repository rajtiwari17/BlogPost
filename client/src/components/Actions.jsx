import * as React from "react";
import { IconButton } from "@mui/material/";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom"

export default function Actions({ id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigator = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    // alert("Update Clicked with id",id);
    console.log(id);
    navigator("/update/"+id)
  };

  const handleDelete = async () => {
    // alert("Delete Clicked with id", id);
    console.log(id);
    // const res = await fetch("http://localhost:7000/api/blog/delete/"+id, {
    const res = await fetch("https://blog-post-client-umber.vercel.app/api/blog/delete/"+id, {

      method:"DELETE",
      headers:{
        token: localStorage.getItem("token")
      }
    })
    const data = await res.json()
    if(res.ok){
      alert("blog deleted!")
    }else{
      console.log(data);
    }
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleUpdate();
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
