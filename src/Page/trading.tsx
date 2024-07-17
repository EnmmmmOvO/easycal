import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DataContext from "../Context/dataContext";
import Button from "@mui/material/Button";
import PageContext from "../Context/pageContext";
import LangContext from "../Context/langContext";

const Trading = () => {
  const { audco_usdt, usdt_aud, bnb_usdt } = useContext(DataContext);

  const { setPage, setTemp } = useContext(PageContext);

  const [type, setType] = useState("0");
  const [total, setTotal] = useState(0);
  const [bnbAmount, setBnbAmount] = useState(0);
  const [audcoAmount, setAudcoAmount] = useState(0);

  const { content } = useContext(LangContext);

  useEffect(() => {
    setAudcoAmount(
      ((type === "0" ? total / usdt_aud : total) - bnb_usdt * bnbAmount) /
        audco_usdt
    );
  }, [total, bnbAmount, audco_usdt, usdt_aud, bnb_usdt, type]);

  return <div></div>;
};

export default Trading;
