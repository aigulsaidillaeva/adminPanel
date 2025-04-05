import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import MyButton from "../components/UI/MyButton";
import { MyTable } from "../components/UI/MyTable";
import { MyInput } from "../components/UI/MyInput";
import { useDispatch, useSelector } from "react-redux";
import { MyModal } from "../components/UI/MyModal";
import {
  addBannerThunk,
  deleteBannerThunk,
  fetchBanners,
} from "../store/slices/bannerSlice";

const BannerPage = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banners);
  const columns = ["project", "dateFrom", "dateTo"];
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedBannerId) {
      dispatch(deleteBannerThunk(selectedBannerId));
      setOpenModal(false);
      setCheckedItems(checkedItems.filter((id) => id !== selectedBannerId));
      setSelectedBannerId(null);
    }
  };

  const handleSubmitBanner = (formData) => {
    dispatch(addBannerThunk(formData));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" gutterBottom>
          Баннеры
        </Typography>
        <MyButton
          text="Создать баннер"
          variant="secend"
          onClick={() => setOpen(true)}
        />
        <MyInput
          open={open}
          handleClose={() => setOpen(false)}
          onSubmit={handleSubmitBanner}
          title="Введите информацию о баннере"
          fields={[
            { label: "Название проекта", name: "project", type: "text" },
            { label: "Дата начала", name: "dateFrom", type: "date" },
            { label: "Дата окончания", name: "dateTo", type: "date" },
          ]}
        />
      </Box>
      <Box>
        <MyTable
          columns={columns}
          data={banners}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          onDelete={(id) => {
            if (checkedItems.includes(id)) {
              setSelectedBannerId(id);
              setOpenModal(true);
            }
          }}
          isBannerTable={true}
        />

        <MyModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          onConfirm={handleDelete}
          message="Вы уверены, что хотите удалить баннер?"
        />
      </Box>
    </Box>
  );
};

export default BannerPage;
