import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sanitizeInput } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUserImage } from "../../../stores/slices/userSlice";
import { useModal } from "../ModalProvider";
import { modifyUser } from "../../../api/users/route";

const ImageModal = ({ handleCancel, currentImageUrl }) => {
    const user = useSelector((state) => state.userSlice.user);
    const [imageUrl, setImageUrl] = React.useState(currentImageUrl);

    const dispatch = useDispatch();
    const { hideModal } = useModal();

    const handleInputChange = (e) => {
        setImageUrl(e.target.value);
    }

    const handleConfirm = async () => {
        console.log(sanitizeInput(imageUrl));
        try {
            const response = await modifyUser(user.id, {img: imageUrl} );
            console.log(response);
            dispatch(setUserImage(sanitizeInput(imageUrl)));
        } catch (error) {
            console.error("Modify user failed:", error);
            return null;
        } finally {
            hideModal();
        }
    }

    return (
        <div className="p-4 relative text-center">
            <button className="absolute top-0 right-0 text-black cursor-pointer hover:text-[#1E3E55]" onClick={ handleCancel }>
                <FontAwesomeIcon icon={"fa-solid fa-xmark"} />
            </button>

            <h3 className="text-center text-3xl underline underline-offset-16 decoration-[#37749F] mb-8">Changer d'image de profil</h3>
            <input type="text" className="w-full border rounded p-2 mb-4" value={ imageUrl } onChange={ handleInputChange }/>
            <img src={ imageUrl } alt="Image missing." className="mx-auto object-cover border rounded bg-gray-200 aspect-square leading-[40dvh]"/>
            <button onClick={ handleConfirm } className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-200">Enregistrer</button>
        </div>
    );
}

export default ImageModal;