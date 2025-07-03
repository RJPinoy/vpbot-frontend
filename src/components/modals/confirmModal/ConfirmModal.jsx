import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmModal = ({ handleCancel, userId, message }) => {
    console.log(userId);

    const handleConfirm = () => {
        console.log("Should confirm :", userId)
    }

    return (
        <>
            <div className="p-4 relative text-center">
                <button className="absolute top-0 right-0 text-black cursor-pointer hover:text-[#1E3E55]" onClick={ handleCancel }>
                    <FontAwesomeIcon icon={"fa-solid fa-xmark"} />
                </button>

                <h3 className="text-xl mb-8 w-2/3 mx-auto">{message}</h3>

                <div className="confirmModal-container flex flex-row items-center justify-center">
                    <button className="bg-red-500 cursor-pointer p-2 text-white rounded-[5px] mx-4 transition-all duration-300 ease-in-out hover:bg-red-600" onClick={ handleCancel }>Annuler</button>
                    <button className="bg-green-500 cursor-pointer p-2 text-white rounded-[5px] mx-4 transition-all duration-300 ease-in-out hover:bg-green-600" onClick={ handleConfirm }>Confirmer</button>
                </div>
            </div>
        </>
    );
}

export default ConfirmModal;