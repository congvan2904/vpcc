import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./modal-user.scss";
import { toggleModalUser } from "../../redux/features/showModalUser";
import { updateUser } from "../../redux/features/usersSlice";

const ModalUser = (props) => {
  const { data: dataModal } = props;
  const [title, setTitle] = useState("");
  // console.log(dataModal);
  // const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change

  const {
    _id,
    username,
    full_name,
    phone_number,
    email,
    role,
    position,
    note,
    ban,
    image_path,
  } = dataModal;
  const refUserName = useRef();
  const refFullName = useRef();
  const refPhone = useRef();
  const refEmail = useRef();
  const refRule = useRef();
  const refPosition = useRef();
  const refNote = useRef();
  const refBan = useRef();
  const refChooseImage = useRef();

  const [dataUser, setDataUser] = useState(null);
  const refImg = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getListUser());
    refUserName.current.value = username;
    refFullName.current.value = full_name;
    refPhone.current.value = phone_number;
    refEmail.current.value = email;
    refRule.current.value = role;
    refPosition.current.value = position;
    refNote.current.value = note;
    refBan.current.value = ban;
  }, []);
  const { data, loading } = useSelector((state) => state.users);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState();
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    // console.log(refImg.current.files[0]);
    const formData = new FormData();
    formData.append("id", _id);
    formData.append("image", file);
    formData.append("username", refUserName.current.value);
    formData.append("fullname", refFullName.current.value);
    formData.append("phone", refPhone.current.value);
    formData.append("email", refEmail.current.value);
    formData.append("role", refRule.current.value);
    formData.append("position", refPosition.current.value);
    formData.append("note", refNote.current.value);
    formData.append("ban", refBan.current.value);
    const payload = {
      ...formData,
    };
    // console.log(file);

    dispatch(updateUser(formData));
  };
  const getUsers = async () => {
    try {
      //   const users = (await instance.get("user/getlists")).data;
      //   if (users && users.message === "success") {
      //     setDataUser(users.data);
      //     return users;
      //   }
      //   setDataUser(users.message);
      //   return users.message;
    } catch (error) {
      // console.log(error.message);
      setDataUser(error.message);
      return error;
    }
  };
  const handClose = () => {
    dispatch(toggleModalUser());
  };
  const handleFocus = (e) => {
    setTitle(e.target.getAttribute("alt"));
  };
  const handleChangerUserName = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refFullName.current.focus();
    }
    if (e.key === "Escape") {
      refUserName.current.value = null;
    }
  };
  const handleChangerFullName = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refPhone.current.focus();
    }
    if (e.key === "Escape") {
      if (refFullName.current.value) {
        refFullName.current.value = null;
      } else {
        refUserName.current.focus();
      }
    }
  };
  const handleChangerPhone = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refEmail.current.focus();
    }
    if (e.key === "Escape") {
      if (refPhone.current.value) {
        refPhone.current.value = null;
      } else {
        refFullName.current.focus();
      }
    }
  };
  const handleChangerEmail = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refRule.current.focus();
    }
    if (e.key === "Escape") {
      if (refEmail.current.value) {
        refEmail.current.value = null;
      } else {
        refPhone.current.focus();
      }
    }
  };
  const handleChangerRole = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refPosition.current.focus();
    }
    if (e.key === "Escape") {
      refRule.current.value = "Chọn quyền";
    }
  };
  const handleChangerPosition = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refNote.current.focus();
    }
    if (e.key === "Escape") {
      if (refPosition.current.value) {
        refPosition.current.value = null;
      } else {
        refRule.current.focus();
      }
    }
  };
  const handleChangerNote = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refBan.current.focus();
    }
    if (e.key === "Escape") {
      if (refNote.current.value) {
        refNote.current.value = null;
      } else {
        refPosition.current.focus();
      }
    }
  };
  const handleChangerBan = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refChooseImage.current.focus();
    }
    if (e.key === "Escape") {
      refBan.current.value = "Chọn";
    }
  };
  const handleChangerChooseImage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refBan.current.focus();
    }
    if (e.key === "Escape") {
      if (refChooseImage.current.value) {
        refChooseImage.current.value = null;
      } else {
        refBan.current.focus();
      }
    }
  };
  return (
    <form onSubmit={handleSubmitForm} className="modal-user" autoComplete="off">
      <div className="modal-user-container">
        <h1>{title}</h1>
        <div className="modal-manager-group">
          <label htmlFor="">Tên đăng nhập</label>
          <input
            id="username"
            ref={refUserName}
            type="text"
            placeholder="Tên đăng nhập"
            alt="Tên đăng nhập"
            name="username"
            value={inputs.name}
            onChange={handleInputChange}
            autoFocus
            onFocus={handleFocus}
            onKeyDown={handleChangerUserName}
          />
          <label htmlFor="">Tên đầy đủ</label>
          <input
            id="fullname"
            ref={refFullName}
            type="text"
            placeholder="Tên đầy đủ"
            alt="Tên đầy đủ"
            name="fullname"
            value={inputs.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleChangerFullName}
          />
        </div>

        <div className="modal-manager-group">
          <label htmlFor="">Số điện thoại</label>
          <input
            id="phone"
            ref={refPhone}
            type="text"
            placeholder="Số điện thoại"
            alt="Số điện thoại"
            name="phone"
            value={inputs.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleChangerPhone}
          />
          <label htmlFor="">Email</label>
          <input
            id="email"
            ref={refEmail}
            type="text"
            placeholder="Email"
            alt="Email"
            name="email"
            value={inputs.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleChangerEmail}
          />
          <label htmlFor="">Quyền</label>
          <select
            id="rule"
            ref={refRule}
            name="rule"
            value={inputs.name}
            onChange={handleInputChange}
            alt="Quyền"
            onFocus={handleFocus}
            onKeyDown={handleChangerRole}
          >
            <option defaultValue="default">Chọn quyền</option>
            <option value="VT">Văn Thư</option>
            <option value="CCV">Công Chứng Viên</option>
            <option value="TK">Thư Ký</option>
            <option value="S">Sếp</option>
          </select>
        </div>
        <div className="modal-manager-group">
          <label htmlFor="">Vị trí</label>
          <input
            id="position"
            ref={refPosition}
            type="text"
            placeholder="Vị trí"
            alt="Vị trí"
            name="position"
            value={inputs.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleChangerPosition}
          />
          <label htmlFor="">Hình</label>

          <label htmlFor="">Ghi Chú</label>
          <input
            id="note"
            ref={refNote}
            type="text"
            placeholder="Ghi Chú"
            alt="Ghi Chú"
            name="note"
            value={inputs.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleChangerNote}
          />
          <label htmlFor="">Ban</label>
          <select
            id="ban"
            ref={refBan}
            name="ban"
            alt="Ban"
            value={inputs.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleChangerBan}
          >
            <option defaultValue="default">Chọn </option>
            <option value="false">Không</option>
            <option value="true">Có</option>
          </select>
        </div>
        <div className="modal-manager-group">
          <input
            id="image_modal"
            // ref={refChooseImage}
            type="file"
            placeholder="Hình"
            alt="Hình"
            name="image"
            accept="image/*"
            filename={file}
            onChange={imageChange}
            // onChange={(e) => setFile(e.target.files[0])}

            // onKeyDown={}
          />
        </div>
        <div className="modal-manager-group">
          <img src={selectedImage || image_path} alt="Thumb" />
        </div>
        <div className="modal-manager-group">
          {/* <button onClick={handleSubmitForm}>Thêm</button> */}
          <button type="submit" className="btn-save">
            💾
          </button>
        </div>
        <button onClick={handClose} className="btn-close">
          x
        </button>
      </div>
    </form>
  );
};

export default ModalUser;
