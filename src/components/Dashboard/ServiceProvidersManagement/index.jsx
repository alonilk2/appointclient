import { DataGrid } from "@mui/x-data-grid";
import { Box, Divider, Button, Avatar } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import useServiceProviders from "../../../hooks/Dashboard/useServiceProviders";
import useUser from "../../../hooks/Dashboard/useUser";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddServiceProviderDialog from "./Dialog/ServiceProviderDialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import UserContext from "../UserContext";

export default function ServiceProvidersManagement() {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [providerForEdit, setProviderForEdit] = useState();
  const serviceProviders = useServiceProviders();
  const user = useContext(UserContext);

  const UserProfileCell = (params) => {
    let filename = params?.value.file;
    return (
      <Box sx={styles.UserProfileCell}>
        <Avatar alt="Remy Sharp" src={filename} />
        {params?.value?.name}
      </Box>
    );
  };

  const handleRemove = async (params) => {
    let response = await user?.findUserByEmail(params?.value?.email);
    if (response) response = await user?.remove(response);
    user.refresh();
  };

  const handleEdit = (params) => {
    return async () => {
      setProviderForEdit(params.value);
      setToggleDialog(!toggleDialog);
    };
  };

  const ActionsCell = (params) => {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleRemove(params)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="add an alarm"
          onClick={handleEdit(params)}
        >
          <EditIcon />
        </IconButton>
      </Stack>
    );
  };

  const handleAddServiceProvider = () => {
    setProviderForEdit(null);
    setToggleDialog(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "userprofile",
      headerName: "נותן השירות",
      width: 180,
      renderCell: UserProfileCell,
    },
    { field: "phone", headerName: "טלפון", width: 200 },
    { field: "email", headerName: `דוא"ל`, width: 280 },
    {
      field: "actions",
      headerName: "פעולות",
      width: 280,
      renderCell: ActionsCell,
    },
  ];

  const rows = serviceProviders?.list?.map((provider) => {
    return {
      id: provider.id,
      userprofile: {
        name: provider.firstname + " " + provider.lastname,
        file: provider?.filename,
      },
      phone: provider.phone,
      email: provider.email,
      actions: provider,
    };
  });

  return (
    <Box sx={styles.Box}>
      <AddServiceProviderDialog
        open={toggleDialog}
        toggle={setToggleDialog}
        providers={serviceProviders}
        providerForEdit={providerForEdit}
      />
      <CardHeader
        title="ניהול נותני שירות"
        sx={styles.CardHeader}
        action={
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={styles.AddButton}
            onClick={handleAddServiceProvider}
          >
            הוסף נותן שירות
          </Button>
        }
      />
      <Divider />
      {rows && (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}
    </Box>
  );
}

const styles = {
  AddButton: { direction: "ltr", backgroundColor: "#0369ff" },
  DeleteIcon: { marginLeft: "20%", color: "red" },
  EditIcon: { marginRight: "20%" },
  Box: { height: "100%", width: "100%", marginLeft: "2%", backgroundColor: 'white' },
  CardHeader: { textAlign: "right" },
  UserProfileCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};
