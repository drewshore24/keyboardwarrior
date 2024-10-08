const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[350px] flex flex-col">
        <div className=" p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
