import { useDispatch, useSelector } from "react-redux";
import "./user-info.scss";
import { getUserLogin } from "../../redux/features/usersSlice";
import { useEffect } from "react";
const UserInfo = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.users);
  // dispatch(getUserLogin({ username }));
  // const { userLogin } = useSelector((state) => state.users);
  // console.log(userLogin);
  // useEffect(() => {
  //   const result = dispatch(getUserLogin({ username }));
  //   console.log(result.data);
  // }, []);
  const handleUserLogin = async () => {
    const result = await dispatch(getUserLogin({ username }));
    console.log(result.payload);
  };
  handleUserLogin();
  return (
    <div className="user-info">
      <button>ok</button>
    </div>
  );
};

export default UserInfo;
