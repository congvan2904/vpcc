import { useDispatch, useSelector } from "react-redux";
import "./user-info.scss";
import { getUserLogin } from "../../redux/features/usersSlice";
import { useEffect } from "react";
const UserInfo = () => {
  // const dispatch = useDispatch();
  // const { username } = useSelector((state) => state.users);
  // dispatch(getUserLogin({ username }));
  const { userLogin } = useSelector((state) => state.users);
  const {
    username,
    fullname,
    phonenumber,
    position,
    role,
    imagepath,
    note,
    email,
  } = userLogin;
  // useEffect(() => {
  //   const result = dispatch(getUserLogin({ username }));
  //   console.log(result.data);
  // }, []);
  const handleUserLogin = async () => {
    // const result = await dispatch(getUserLogin({ username }));
    // console.log(result.payload);
  };
  handleUserLogin();
  return (
    <div className="user-info">
      <div className="user-info-username">Ten dang nhap : {username}</div>
      <div className="user-info-fullname">Ten day du : {fullname}</div>
      <div className="user-info-email">Email : {email}</div>
      <div className="user-info-phone">So dien thoai : {phonenumber}</div>
      <div className="user-info-position">Vi tri : {position}</div>
      <div className="user-info-role">Quyen : {role}</div>
      <div className="user-info-note">Ghi chu : {note}</div>
    </div>
  );
};

export default UserInfo;
