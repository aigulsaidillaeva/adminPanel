import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { MyTable } from "../components/UI/MyTable";
import { MyModal } from "../components/UI/MyModal";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router";

import Breadcrumbss from "../components/UI/BreadCrumbs";
import {
  deleteApplicationThunk,
  fetchApplication,
} from "../store/slices/applicationsSlice";

const BannerDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.applications);
  const { banners } = useSelector((state) => state.banners);
  const [openModal, setOpenModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  const selectedBanner = banners.find((banner) => banner.id === parseInt(id));
  const title = selectedBanner.project;

  useEffect(() => {
    dispatch(fetchApplication(id));
  }, [dispatch, id]);

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

  return (
    <Box>
      <Typography variant="h4">Набор на курс {title}</Typography>
      <Breadcrumbss />

      <Box>
        <MyTable
          columns={["name", "phone", "status"]}
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

export default BannerDetail;
