import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { useState } from "react";
import TransportInfosForm from "../Components/Commande/Forms/TransportInfosForm";
import PickupPlaceForm from "../Components/Commande/Forms/PickupPlaceForm";
import BeneficiaryForm from "../Components/Commande/Forms/BeneficiaryForm";

export default function CommandePage() {
  //   const [formValue, setFormValue] = useState<TransportCmd>();
  const [tab, setTab] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(_e, value) => setTab(value)} centered>
          <Tab label="Mission" />
          <Tab label="Patient" />
        </Tabs>
      </Box>

      <Box paddingY={2} display={tab != 0 ? "none" : "inherit"}>
        <Typography marginTop={2} marginBottom={1}>
          Informations
        </Typography>
        <TransportInfosForm label="Informations" size="small" />
        <Typography marginTop={2} marginBottom={1}>
          Prise en charge
        </Typography>
       
        <PickupPlaceForm size="small" />

        <Typography marginTop={2} marginBottom={1}>
          Rendez-vous
        </Typography>
        <PickupPlaceForm size="small" />
      </Box>
      <Box paddingY={2} display={tab != 1 ? "none" : "inherit"}>
        <Typography marginTop={2} marginBottom={1}>
          Beneficiaire
        </Typography>
        <BeneficiaryForm size="small" />
      </Box>
      <Button fullWidth variant="contained" size="small">
        Créer{" "}
      </Button>
    </>
  );
}
