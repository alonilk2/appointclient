import { DataGrid } from "@mui/x-data-grid";
import { Box, Divider, Button, Avatar, Alert } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import useServiceProviders from "../../../hooks/Dashboard/useServiceProviders";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddServiceProviderDialog from "./Dialog/ServiceProviderDialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import UserContext from "../UserContext";
import { ColorModeContext } from "..";
import React from "react";
import ErrorHandler from "../../../API/ErrorHandler";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import {
  DELETE_PROVIDER_TEXT,
  DELETE_PROVIDER_TITLE,
} from "../../../constants/ServiceProvidersConstants";

export default function ServiceProvidersManagement() {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [providerForEdit, setProviderForEdit] = useState();
  const [error, setError] = useState();
  const [toggleConfirmDialog, setToggleConfirmDialog] = useState(false);
  const serviceProviders = useServiceProviders();
  const user = useContext(UserContext);
  const colorMode = useContext(ColorModeContext);

  const UserProfileCell = (params) => {
    let filename = params?.value.file;
    return (
      <Box sx={styles.UserProfileCell}>
        <Avatar alt="Remy Sharp" src={filename} />
        {params?.value?.name}
      </Box>
    );
  };

  const handleClickRemoveProvider = (params) => {
    setProviderForEdit(params);
    setToggleConfirmDialog(true);
  };

  const handleRemove = async () => {
    let response = await user?.findUserByEmail(providerForEdit?.value?.email);
    if (ErrorHandler(response, setError)) {
      response = await user?.remove(response.data);
      if (ErrorHandler(response, setError)) {
        await user.refresh();
        setToggleConfirmDialog(false);
      }
    }
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
          onClick={() => handleClickRemoveProvider(params)}
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

  const handleCloseConfirmationDialog = () => {
    setToggleConfirmDialog(false);
    setError();
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
      <ConfirmationDialog
        title={DELETE_PROVIDER_TITLE}
        text={DELETE_PROVIDER_TEXT}
        error={error}
        name={
          providerForEdit?.value?.firstname + providerForEdit?.value?.lastname
        }
        open={toggleConfirmDialog}
        handleClose={handleCloseConfirmationDialog}
        handleConfirm={handleRemove}
      />
      <CardHeader
        title="ניהול נותני שירות"
        sx={
          colorMode.mode === "light"
            ? { backgroundColor: "white", ...styles.CardHeader }
            : { backgroundColor: "inherit", ...styles.CardHeader }
        }
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
          pageSize={12}
          rowsPerPageOptions={[12]}
          sx={
            colorMode.mode === "light"
              ? { backgroundColor: "white" }
              : { backgroundColor: "inherit", border: 'none' }
            }
        />
      )}
    </Box>
  );
}

const styles = {
  AddButton: { direction: "ltr" },
  DeleteIcon: { marginLeft: "20%", color: "red" },
  EditIcon: { marginRight: "20%" },
  Box: { height: "100%", width: "100%", marginLeft: "2%", backgroundColor: 'rgb(27, 38, 53)'},
  CardHeader: { textAlign: "right" },
  UserProfileCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};
