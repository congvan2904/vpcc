import "./modal.scss";
const Modal = ({ children, shown, close }) => {
  return shown ? (
    <div
      className="modal-backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        close();
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <div className="modal-content-header">
          <div className="search">
            Tìm đường đến Phòng Công Chứng Nguyễn Đức Điền – Nhà Bè
          </div>
          <div className="button" onClick={close}>
            x
          </div>
        </div>

        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
