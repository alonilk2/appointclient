import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Divider,
  Button,
  Avatar,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import useServices from "../../../hooks/Dashboard/useServices";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ServicesDialog from "./ServicesDialog";
import UserContext from "../UserContext";
import { ColorModeContext } from "..";

export default function ServicesManagement(props) {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [serviceForEdit, setServiceForEdit] = useState();
  const user = useContext(UserContext);
  const services = useServices(user);
  const colorMode = useContext(ColorModeContext);

  const handleRemove = (params) => {
    return async () => {
      let response = await services?.remove(params?.value?.id);
      if (response?.type.endsWith("fulfilled")) {
        services.refresh();
      }
    };
  };

  const handleEdit = (params) => {
    return async () => {
      setServiceForEdit(params.value);
      setToggleDialog(!toggleDialog);
    };
  };

  const ActionsCell = (params) => {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={handleRemove(params)}
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

  const handleAddService = () => {
    setServiceForEdit(null);
    setToggleDialog(true);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "שם השירות",
      width: 180,
    },
    { field: "cost", headerName: "עלות", width: 200 },
    { field: "duration", headerName: "אורך פגישה (דקות)", width: 200 },

    {
      field: "actions",
      headerName: "פעולות",
      width: 280,
      renderCell: ActionsCell,
    },
  ];

  const rows = services.list?.map((service) => {
    return {
      id: service.id,
      name: service.name,
      cost: service.cost,
      duration: service.duration,
      actions: service,
    };
  });

  return (
    <Box sx={styles.Box}>
      <ServicesDialog
        open={toggleDialog}
        toggle={setToggleDialog}
        add={services.add}
        serviceForEdit={serviceForEdit}
        update={services.update}
        refresh={services.refresh}
      />
      <CardHeader
        title="ניהול שירותים"
        sx={
          colorMode.mode === "light"
            ? { backgroundColor: "white" }
            : { backgroundColor: "inherit" }
        }
        action={
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={styles.AddButton}
            onClick={handleAddService}
          >
            הוסף שירות
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
  Box: {
    height: "100%",
    width: "100%",
    marginLeft: "2%",
    backgroundColor: "rgb(30 30 30)",
  },
  CardHeader: { textAlign: "right" },
  UserProfileCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};
