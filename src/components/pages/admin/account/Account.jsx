import * as React from "react";
import { useModal } from "../../../modals/ModalProvider";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../stores/slices/adminSlice";

const AdminAccount = () => {
    const user = useSelector((state) => state.admin.user);
    const currentUser = JSON.parse(localStorage.getItem('extranet-user'));
    const [firstName, setFirstName] = React.useState(currentUser.firstName);
    const [lastName, setLastName] = React.useState(currentUser.lastName);
    const [username, setUsername] = React.useState(currentUser.username);
    const [email, setEmail] = React.useState(currentUser.email);
    const [img, setImg] = React.useState(currentUser.img);
    const { showModal } = useModal();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setUser(currentUser));
    }, []);

    React.useEffect(() => {
        setImg(user.img);
    }, [user.img]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "img":
                setImg(value);
                break;
            default:
                break;
        }
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        showModal("image", {
            currentImageUrl: img,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            img: img,
        };
        dispatch(setUser(updatedUser));
        console.log("User updated:", updatedUser);
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        showModal("changePassword");
    }

    return (
        <>
            <h1 className="text-4xl font-bold w-full mb-8">Mon Compte :</h1>
            <p>Bienvenue dans votre compte administrateur !</p>
            <form className="w-full flex flex-col gap-4 mt-8">
                <div className="flex justify-start items-center flex-row gap-8 w-full">
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="firstName">Prénom :</label>
                        <input className="border rounded px-2 py-1 mt-1" type="text" id="firstName" name="firstName" onChange={ handleInputChange } value={ firstName } />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="lastName">Nom :</label>
                        <input className="border rounded px-2 py-1 mt-1" type="text" id="lastName" name="lastName" onChange={ handleInputChange } value={ lastName } />
                    </div>
                </div>
                <div className="flex justify-start items-start flex-row gap-8 w-full mb-4">
                    <div className="flex justify-start items-center flex-col gap-4 w-1/2">
                        <div className="flex flex-col w-full">
                            <label htmlFor="username">Nom d'utilisateur :</label>
                            <input className="border rounded px-2 py-1 mt-1" type="text" id="username" name="username" onChange={ handleInputChange } value={ username } autoComplete="off"/>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="email">Email :</label>
                            <input className="border rounded px-2 py-1 mt-1" type="email" id="email" name="email" onChange={ handleInputChange } value={ email } autoComplete="off"/>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label>Image de profil : <button onClick={ handleImageChange } className="italic text-sm underline cursor-pointer text-[#37749F] hover:text-[#1E3E55] transition-all duration-200">Modifier l'image de profil</button></label>
                        {img && (<img className="rounded border-2 border-gray-700 aspect-square w-[15dvh] object-cover" src={ img } alt="Photo de profil" />)}
                    </div>
                </div>
                <label className="mb-4">Mot de passe : <button onClick={ handleChangePassword } className="italic text-sm underline cursor-pointer text-[#37749F] hover:text-[#1E3E55] transition-all duration-200">Changer son mot de passe</button></label>
                <div className="flex justify-start items-center flex-row gap-4">
                    <button type="submit" onClick={ handleSubmit } className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Enregistrer</button>
                </div>
            </form>
        </>
    );
}

export default AdminAccount;