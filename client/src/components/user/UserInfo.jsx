import { useDispatch, useSelector } from "react-redux";
import "./user-info.scss";
import { getUserLogin } from "../../redux/features/usersSlice";
import { useEffect, useRef, useState } from "react";
import { toggleModalUser } from "../../redux/features/showModalUser";
import { logout } from "../../redux/features/authSlice";
import { Navigate, redirect, useNavigate } from "react-router-dom";

function useOutsideAlerter(ref) {
  const dispatch = useDispatch();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        dispatch(toggleModalUser());
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // dispatch(getUserLogin({ username }));
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

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

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
    // setIsLogin(false);
  };
  const [isLogin, setIsLogin] = useState(true);
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="user-info" ref={wrapperRef}>
      <div
        className="user-info-username"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        Ten dang nhap : {username}
        {isShown && (
          <div className="sign-out" onClick={handleLogOut}>
            Dang xuat
          </div>
        )}
      </div>
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
