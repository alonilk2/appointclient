import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import UserContext from "../UserContext";
import { ProfileChipMenu } from "./ProfileChipMenu";

export default function ProfileChip(user) {
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
          avatar={<Avatar alt="Natacha" src={user?.user?.imageUrl} />}
          label={user?.user?.firstname + " " + user?.user?.lastname}
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

