import React, { useEffect } from "react";
import Manager1 from "./Manager1";
import { contracts as contractsR } from "../redux/features/contractsSlice";
import { useDispatch } from "react-redux";
const Manager2 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(contractsR());
      console.log({ result });
    }
    fetchData();
  }, []);

  return <Manager1>New contract</Manager1>;
};

export default Manager2;
