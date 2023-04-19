import { useDispatch, useSelector } from "react-redux";
const BodyRightDebtContracts = () => {
  const dispatch = useDispatch();
  const { groupData } = useSelector((state) => state.contracts);
  console.log({ groupData });
  return <div>BodyRightDebtContracts</div>;
};

export default BodyRightDebtContracts;
