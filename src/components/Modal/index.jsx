const Modal = ({
    isFormSubmitted = false,
    title = "Modal title",
    isOk = true,
    isCancel = true,
    okText = "ok",
    cancelText = "cancel",
    bodyContent = "",
    closeHandler
}) => {
    return (
        <div
            className={`modal fade ${isFormSubmitted && "show"}`}
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            style={{ display: isFormSubmitted ? "block" : "none" }}
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            {title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={closeHandler}
                        ></button>
                    </div>
                    <div className="modal-body">{bodyContent}</div>
                    <div className="modal-footer">
                        {isCancel && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={closeHandler}
                            >
                                {cancelText}
                            </button>
                        )}

                        {isOk && (
                            <button type="button" className="btn btn-primary" onClick={closeHandler}>
                                {okText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
