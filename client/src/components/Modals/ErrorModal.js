import { Modal } from "antd";
import React from "react";

function ErrorModal({ isErrorModalOpen, setIsErrorModalOpen, error }) {
  const handleOk = () => {
    setIsErrorModalOpen(false);
  };
  const handleCancel = () => {
    setIsErrorModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Error"
        open={isErrorModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {error?.message && <div>{error?.message}</div>}
      </Modal>
    </>
  );
}

export default ErrorModal;
