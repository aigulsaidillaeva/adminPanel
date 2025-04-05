import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import MyButton from "../components/UI/MyButton";
import { MyTable } from "../components/UI/MyTable";
import { MyInput } from "../components/UI/MyInput";
import { useDispatch, useSelector } from "react-redux";
import { MyModal } from "../components/UI/MyModal";
import {
  addApplicationThunk,
  deleteApplicationThunk,
  fetchApplication,
} from "../store/slices/applicationsSlice";

const ApplicationPage = () => {
  const dispatch = useDispatch();
  const { applications, isLoading, error } = useSelector(
    (state) => state.applications
  );
  const columns = ["№", "name", "phone"];

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    dispatch(fetchApplication());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedApplicationId) {
      dispatch(deleteApplicationThunk(selectedApplicationId));
      setOpenModal(false);
      setCheckedItems(
        checkedItems.filter((id) => id !== selectedApplicationId)
      );
      setSelectedApplicationId(null);
    }
  };

  const handleSubmitApplication = (formData) => {
    dispatch(addApplicationThunk(formData));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Заявки</Typography>
        <MyButton
          text="Создать заявку"
          variant="secend"
          onClick={() => setOpen(true)}
        />
        <MyInput
          open={open}
          handleClose={() => setOpen(false)}
          onSubmit={handleSubmitApplication}
          title="Введите информацию для заявки"
          fields={[
            { label: "Имя", name: "name", type: "text" },
            { label: "Телефон", name: "phone", type: "text" },
          ]}
        />
      </Box>
      <Box>
        <MyTable
          columns={columns}
          data={applications}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          onDelete={(id) => {
            if (checkedItems.includes(id)) {
              setSelectedApplicationId(id);
              setOpenModal(true);
            }
          }}
        />
        <MyModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          onConfirm={handleDelete}
          message="Вы уверены, что хотите удалить заявку?"
        />
      </Box>
    </Box>
  );
};

export default ApplicationPage;
