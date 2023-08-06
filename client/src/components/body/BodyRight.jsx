import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../empty/Empty";
import BodyRightDebtContracts from "./BodyRightDebtContracts";
import BodyRightDebtContractsSearch from "./BodyRightDebtContractsSearch";
import BodyRightNewContractOld from "./BodyRightNewContractOld";
import BodyRightNewContractSearch from "./BodyRightNewContractSearch";
import BodyRightNewContractToday from "./BodyRightNewContractToday";
import BodyRightUsers from "./BodyRightUsers";
import BodyRightUsersSearch from "./BodyRightUsersSearch";
import {
  contracts as contractsR,
  getAllContract,
  getContractsToday,
  getLastContract,
  groupDebtContracts,
} from "../../redux/features/contractsSlice";
import { users as usersT } from "../../redux/features/usersSlice";
import AddBorrowing from "./borrowing/AddBorrowing";
import ListBorrowing from "./borrowing/ListBorrowing";
import SearchBorrowing from "./borrowing/SearchBorrowing";
const BodyRight = () => {
  const select = useSelector((state) => state.showRightBar.select);
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchData() {
      // dispatch(contractsR());
      dispatch(usersT());
      dispatch(getContractsToday());
      dispatch(getLastContract());

      dispatch(getAllContract({ page: 1, page_size: 50 }));
    }
    fetchData();
  }, []);
  const dataSelect = [
    {
      choose: "/new-contract-today",
      show: <BodyRightNewContractToday />,
    },
    {
      choose: "/new-contract-old",
      show: <BodyRightNewContractOld />,
    },
    {
      choose: "/new-contract-search",
      show: <BodyRightNewContractSearch />,
    },
    {
      choose: "/debt-contracts",
      show: <BodyRightDebtContracts />,
    },
    {
      choose: "/debt-contracts-search",
      show: <BodyRightDebtContractsSearch />,
    },
    {
      choose: "/borrowing-add",
      show: <AddBorrowing />,
    },
    {
      choose: "/borrowing-list",
      show: <ListBorrowing />,
    },
    {
      choose: "/borrowing-search",
      show: <SearchBorrowing />,
    },
    {
      choose: "/users",
      show: <BodyRightUsers />,
    },
    {
      choose: "/users-search",
      show: <BodyRightUsersSearch />,
    },
  ];
  const filter = dataSelect.find((item) => item.choose === select);
  return <>{select === "" ? <Empty /> : filter.show}</>;
};

export default BodyRight;
