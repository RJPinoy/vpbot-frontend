import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sanitizeInput, isValidEmail } from "../../../utils";
import { useModal } from "../ModalProvider";

const ChangePassword = ({ handleCancel }) => {
    const [email, setEmail] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const { hideModal } = useModal();

    const handleInputChange = (e) => {
        setEmail(e.target.value.trim());
        setErrorMessage("");
    }

    const handleConfirm = () => {
        if (!email.trim()) {
            setErrorMessage("Veuillez entrer une adresse email.");
            return;
        } else if (!isValidEmail(email)) {
            setErrorMessage("Veuillez entrer une adresse email valide.");
            return;
        }

        console.log(sanitizeInput(email));
        hideModal();
    }

    return (
        <div className="p-4 relative text-center">
            <button className="absolute top-0 right-0 text-black cursor-pointer hover:text-[#1E3E55]" onClick={ handleCancel }>
                <FontAwesomeIcon icon={"fa-solid fa-xmark"} />
            </button>

            <p className="text-center text-xl mb-4">Vous avez oublié votre mot de passe ? Entrez votre adresse e-mail ci-dessous pour recevoir un mot de passe temporaire. Vous pourrez ensuite le modifier.</p>

            {errorMessage && (
                <div className="mb-4 px-4 py-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                    {errorMessage}
                </div>
            )}

            <div className="flex flex-row justify-center items-center gap-2 mb-4">
                <label htmlFor="email">Adresse e-mail :</label>
                <input type="email" name="email" className="w-1/2 border rounded p-2" onChange={ handleInputChange }/>
            </div>
            <button onClick={ handleConfirm } className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-200">Enregistrer</button>
        </div>
    );
}

export default ChangePassword;