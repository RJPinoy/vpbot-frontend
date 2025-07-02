import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sanitizeInput, isValidEmail } from "../../../utils";

const ForgetPasswordModal = ({ handleCancel, handleConfirm }) => {
    const [email, setEmail] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState('');

    const onSubmit = () => {
        if (!email.trim()) {
            setErrorMessage("Veuillez entrer une adresse email.");
            return;
        } else if (!isValidEmail(email)) {
            setErrorMessage("Veuillez entrer une adresse email valide.");
            return;
        }

        console.log(email);
    };

    return (
        <div className="p-4 relative">
            <button className="absolute top-0 right-0 text-black cursor-pointer hover:text-[#1E3E55]" onClick={ handleCancel }>
                <FontAwesomeIcon icon={"fa-solid fa-xmark"} />
            </button>

            <h3 className="text-center text-md mb-6">
                Vous avez oublié votre mot de passe ?<br />
                Nous allons vous envoyer un mot de passe temporaire pour vous permettre de le changer.<br />
                Veuillez confirmer votre adresse email.
            </h3>

            {errorMessage && (
                <div className="mb-4 px-4 py-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                    {errorMessage}
                </div>
            )}

            <div className="flex flex-row items-center justify-center mb-6">
                <label htmlFor="email" className="mr-2 font-medium">Adresse email :</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-500 p-2 w-80 rounded font-medium"
                    required
                />
            </div>

            <div className="flex justify-center gap-4">
                <button 
                    className="bg-[#1E3E55] text-white p-2 rounded-[5px] cursor-pointer hover:bg-green-600 transition-all duration-300"
                    onClick={ onSubmit }
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
};

export default ForgetPasswordModal;