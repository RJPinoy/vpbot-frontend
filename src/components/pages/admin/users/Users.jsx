import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { groupUsers } from '../../../../fixtures/fixtures';
import { parseDate } from '../../../../utils';
import { useModal } from '../../../modals/ModalProvider';

const Users = () => {
    const [inputSearch, setInputSearch] = React.useState("");
    const [checkedUsers, setCheckedUsers] = React.useState(new Set());
    const [filterRole, setFilterRole] = React.useState("Tous");
    const { showModal } = useModal();

    const users = groupUsers();
    const usersArray = Object.values(users);

    const handleResetInputSearch = () => {
        if (inputSearch) setInputSearch("");
    }

    const handleInputChange = (e) => {
        setInputSearch(e.target.value)
    }

    const handleCheckboxChange = (key) => {
        setCheckedUsers(prev => {
            const newChecked = new Set(prev);
            if (newChecked.has(key)) {
                newChecked.delete(key);
            } else {
                newChecked.add(key);
            }
            return newChecked;
        });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allKeys = new Set(filteredUsers.map(u => u.id));
            setCheckedUsers(prev => {
                const updated = new Set(prev);
                allKeys.forEach(k => updated.add(k));
                return updated;
            });
        } else {
            setCheckedUsers(prev => {
                const updated = new Set(prev);
                filteredUsers.forEach(u => updated.delete(u.id));
                return updated;
            });
        }
    };

    const handleResetPassword = (id) => {
        const arrayId = Array.isArray(id) ?
            id : id instanceof Set ?
                Array.from(id) : [id];

        showModal("confirm", {
            userId: arrayId,
            action: "resetPassword",
            message: (
                <div>
                    <p className='text-xl'>Vous êtes sur le point de réinitialiser le mot de passe de :</p>
                    <p className='max-h-[30dvh] overflow-y-auto my-2'>
                        {arrayId.map((id, index) => (
                            <span key={id}>
                                <strong className="text-blue-700">{id}</strong>
                                {index < arrayId.length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                    <p><strong className="text-xl text-red-500">Cette action est irréversible.</strong></p>
                </div>
            )
        });
    };

    const handleChangeRole = (id) => {
        const arrayId = Array.isArray(id) ?
            id : id instanceof Set ?
                Array.from(id) : [id];

        showModal("confirm", {
            userId: arrayId,
            action: "changeRole",
            message: (
                <div>
                    <p className='text-xl'>Vous êtes sur le point de modifier le rôle de :</p>
                    <p className='max-h-[30dvh] overflow-y-auto my-2'>
                        {arrayId.map((id, index) => (
                            <span key={id}>
                                <strong className="text-blue-700">{id}</strong>
                                {index < arrayId.length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                </div>
            ),
        })
    }

    const handleDeleteAccount = (id) => {
        const arrayId = Array.isArray(id) ?
            id : id instanceof Set ?
                Array.from(id) : [id];

        showModal("confirm", {
            userId: arrayId,
            action: "deleteAccount",
            message: (
                <div>
                    <p className='text-xl'>Vous êtes sur le point de supprimer le compte de :</p>
                    <p className='max-h-[30dvh] overflow-y-auto my-2'>
                        {arrayId.map((id, index) => (
                            <span key={id}>
                                <strong className="text-blue-700">{id}</strong>
                                {index < arrayId.length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                    <p><strong className="text-xl text-red-500">Cette action est irréversible.</strong></p>
                </div>
            ),
        })
    }

    const isInactive = (dateString) => {
        const lastDate = parseDate(dateString);
        const now = new Date();
        const diffInDays = (now - lastDate) / (1000 * 60 * 60 * 24);
        return diffInDays > 30;
    };

    const filteredUsers = usersArray.filter(user => {
        const search = inputSearch.toLowerCase();

        const matchesSearch =
            user.firstName?.toLowerCase().includes(search) ||
            user.lastName?.toLowerCase().includes(search) ||
            user.username?.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search) ||
            user.role?.toLowerCase().includes(search) ||
            user.createdAt?.toLowerCase().includes(search) ||
            user.lastConnection?.toLowerCase().includes(search);

        // If there's a search query, only include users that match
        if (inputSearch && !matchesSearch) return false;

        // Now apply the tag filter
        switch (filterRole) {
            case "Admin":
                return user.role === "ADMIN" || user.role === "SUPERADMIN";
            case "Utilisateur":
                return user.role === "USER";
            case "Inactif":
                return isInactive(user.lastConnection);
            case "Tous":
            default:
                return true;
        }
    });

    // Is "select all" checkbox checked?
    const allSelected = 
        filteredUsers.length > 0 && 
        filteredUsers.every(user => checkedUsers.has(user.id))

    return (
        <>
            <h1 className="text-4xl font-bold w-full mb-8">Utilisateurs :</h1>
            <p>Retrouvez tous les utilisateurs de l'application.</p>
            <div className='flex flex-row justify-between items-center w-full my-4'>
                <div className='flex flex-row'>
                    {["Tous", "Admin", "Utilisateur", "Inactif"].map(role => {
                        const count = [...usersArray].filter(u => {
                            if (role === "Tous") return true;
                            if (role === "Admin") return u.role === "ADMIN";
                            if (role === "Utilisateur") return u.role === "USER";
                            if (role === "Inactif") return isInactive(u.lastConnection);
                            return false;
                        }).length;

                        return (
                            <span
                                key={role}
                                onClick={() => setFilterRole(role)}
                                className={`flex flex-row items-center px-2 border-r cursor-pointer hover:underline ${
                                    filterRole === role ? "font-bold text-black" : "text-blue-600 "
                                }`}
                            >
                                {role} ({count})
                            </span>
                        );
                    })}
                </div>

                <div className='relative'>
                    <label htmlFor="search" className='mr-2'>Recherche :</label>
                    <input type="text" id='search' name="search" className='border rounded pl-2 pr-6 py-1' value={ inputSearch } onChange={ handleInputChange } />
                    <div className={`absolute top-1/2 -translate-y-1/2 right-2 ${inputSearch ? 'cursor-pointer' : ''}`} onClick={ handleResetInputSearch }>
                        <FontAwesomeIcon icon={inputSearch ? "fa-solid fa-xmark" : "fa-solid fa-magnifying-glass"} />
                    </div>
                </div>
            </div>
            { filteredUsers.length === 0 ?
                <>
                    <div className='w-full text-center mt-8'>Aucun utilisateurs trouvé.</div>
                </>
            :
                <>
                    <div className='w-full border border-gray-700 rounded-md max-h-[70dvh] overflow-y-auto mb-2 relative'>
                        <table className='w-full bg-gray-200'>
                            <thead className='sticky top-0 bg-gray-200'>
                                <tr>
                                    <th className='p-2'>
                                        <input 
                                            type="checkbox"
                                            name='checkbox-select-all'
                                            checked={allSelected}
                                            onChange={handleSelectAll}
                                            aria-label="Select all users"
                                        />
                                    </th>
                                    <th className='text-start'>NOM Prénom</th>
                                    <th className='text-start'>Pseudo</th>
                                    <th className='text-start'>E-mail</th>
                                    <th className='text-start'>Rôle</th>
                                    <th className='text-start'>Date de création</th>
                                    <th className='text-start'>Dernière connexion</th>
                                </tr>
                            </thead>
                            <tbody>
                                { filteredUsers.map((user) => {
                                    return (
                                        <tr key={user.id} className='group odd:bg-gray-200 even:bg-white'>
                                            <td className='p-2 text-center'>
                                                <input type="checkbox"
                                                    name='checkbox-select'
                                                    checked={checkedUsers.has(user.id)}
                                                    onChange={() => handleCheckboxChange(user.id)}
                                                />
                                            </td>
                                            <td className='max-w-[250px] align-top'>
                                                <div className='p-2 my-2'>
                                                    <div className='flex flex-row justify-start gap-2 mb-2'>
                                                        {user.img && (
                                                            <img
                                                                className="rounded border-2 border-gray-700 aspect-square w-[50px] object-cover"
                                                                src={user.img}
                                                                alt="Photo de profil"
                                                            />
                                                        )}
                                                        <span className='w-full'>{user.lastName.toUpperCase()} {user.firstName}</span>
                                                    </div>
                                                    <div className='flex flex-col justify-center gap-x-2 opacity-0 transition duration-200 ease-in-out group-hover:opacity-100'>
                                                        <button onClick={ () => handleResetPassword(user.id) } className="italic text-sm text-blue-600 cursor-pointer hover:underline">Réinitialiser mot de passe</button>
                                                        <button onClick={ () => handleChangeRole(user.id) } className="italic text-sm text-blue-600 cursor-pointer hover:underline">Modifier le rôle</button>
                                                        <button onClick={ () => handleDeleteAccount(user.id) } className="italic text-sm text-red-600 cursor-pointer hover:underline">Supprimer le compte</button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.createdAt}</td>
                                            <td>{user.lastConnection}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-row gap-4 items-center'>
                        <span className='text-sm font-thin italic'>{checkedUsers.size} sélectionné{checkedUsers.size > 1 ? 's' : ''}</span>
                        { checkedUsers.size > 0 && (
                            <>
                                <button onClick={ () => handleResetPassword(checkedUsers) } className="cursor-pointer bg-blue-500 text-white px-4 py-1 text-sm rounded hover:bg-blue-600 transition duration-200">Réinitialiser le mot de passe</button>
                                <button onClick={ () => handleChangeRole(checkedUsers) } className="cursor-pointer bg-blue-500 text-white px-4 py-1 text-sm rounded hover:bg-blue-600 transition duration-200">Modifier le rôle</button>
                                <button onClick={ () => handleDeleteAccount(checkedUsers) } className="cursor-pointer bg-red-500 text-white px-4 py-1 text-sm rounded hover:bg-red-600 transition duration-200">Supprimer {checkedUsers.size > 1 ? 'les comptes' : 'le compte'}</button>
                            </>
                        )}
                    </div>
                </>
            }
        </>
    );
}

export default Users;