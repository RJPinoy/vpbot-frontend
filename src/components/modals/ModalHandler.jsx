import { useModal } from './ModalProvider';
import FormModal from './formModal/FormModal';
import ConfirmModal from './confirmModal/ConfirmModal';
import ForgetPasswordModal from './forgetPasswordModal/ForgetPasswordModal';
import ImageModal from './imageModal/ImageModal';
import ChangePassword from './changePasseword/ChangePassword';

const ModalHandler = () => {
    const { modalState, hideModal } = useModal();

    const renderModal = () => {
        switch (modalState.type) {
            case 'form':
                return <FormModal handleCancel={hideModal} {...modalState.props} />;
            case 'forgetPassword':
                return <ForgetPasswordModal handleCancel={hideModal} {...modalState.props} />;
            case 'image':
                return <ImageModal handleCancel={hideModal} {...modalState.props} />;
            case 'changePassword':
                return <ChangePassword handleCancel={hideModal} {...modalState.props} />;
            default:
                return <ConfirmModal handleCancel={hideModal} {...modalState.props} />;
        }
    };

    if (!modalState.isVisible) return null;

    return (
        <div
            id="modal-container"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 w-full h-full flex items-center justify-center flex-col z-[999]"
            onClick={hideModal}
        >
            <div className="modal text-black font-bold bg-white rounded-lg shadow-lg p-6 min-w-1/2 max-w-2/3" onClick={(e) => e.stopPropagation()}>
                {renderModal()}
            </div>
        </div>
    );
};

export default ModalHandler;