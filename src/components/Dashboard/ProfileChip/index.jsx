import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { ProfileChipMenu } from "./ProfileChipMenu";

export default function ProfileChip(userInstance) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="profile-chip-container">
      <Stack direction="row" spacing={1}>
        <Chip
          avatar={<Avatar alt="Natacha" src={userInstance?.imageUrl} />}
          label={userInstance?.firstname + " " + userInstance?.lastname}
          variant="outlined"
          clickable
          onClick={handleClick}
        />
      </Stack>
      {toggleMenu && (
        <ProfileChipMenu auth={auth} navigate={(path) => navigate(path)} />
      )}
    </div>
  );
}

export const styles = {
  profileMenuBox: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "white",
    boxShadow: "0px 10px 41px 3px rgba(0,0,0,0.3)",
    zIndex: 3,
  },
};
