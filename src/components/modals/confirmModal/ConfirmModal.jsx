import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmModal = ({ handleCancel, userId, message, action}) => {
    const [selectedRole, setSelectedRole] = React.useState("USER");

    const handleConfirm = () => {
        switch (action) {
            case "resetPassword":
                console.log("Confirming reset password... : ", userId);
                return
            case "changeRole":
                console.log("Confirming change role... : ", userId);
                console.log("Selected role:", selectedRole);
                return
            case "deleteAccount":
                console.log("Confirming deletion... : ", userId);
                return
            default:
                return
        }
    }

    return (
        <>
            <div className="p-4 relative text-center">
                <button className="absolute top-0 right-0 text-black cursor-pointer hover:text-[#1E3E55]" onClick={ handleCancel }>
                    <FontAwesomeIcon icon={"fa-solid fa-xmark"} />
                </button>

                {message}

                {action === "changeRole" && (
                    <div className="my-4">
                        <label htmlFor="role-select" className="mr-2 font-medium">Rôle :</label>
                        <select
                            id="role-select"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="USER">Utilisateur</option>
                            <option value="ADMIN">Administrateur</option>
                        </select>
                    </div>
                )}

                <p className="text-xl mt-2 mb-8">Êtes-vous sûr de vouloir continuer ?</p>

                <div className="confirmModal-container flex flex-row items-center justify-center">
                    <button className="bg-red-500 cursor-pointer p-2 text-white rounded-[5px] mx-4 transition-all duration-300 ease-in-out hover:bg-red-600" onClick={ handleCancel }>Annuler</button>
                    <button className="bg-green-500 cursor-pointer p-2 text-white rounded-[5px] mx-4 transition-all duration-300 ease-in-out hover:bg-green-600" onClick={ handleConfirm }>Confirmer</button>
                </div>
            </div>
        </>
    );
}

export default ConfirmModal;