import * as React from 'react';
import { listUsers } from '../../api/users/route';
import { parseDate } from '../../utils';

export const useUsers = () => {
    const [users, setUsers] = React.useState([]);
    const [inputSearch, setInputSearch] = React.useState("");
    const [checkedUsers, setCheckedUsers] = React.useState(new Set());
    const [filterRole, setFilterRole] = React.useState("Tous");
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const fetchedRef = React.useRef(false);
    
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const LIMIT = 20;
            const offset = (page - 1) * LIMIT;
            const usersList = await listUsers(LIMIT, offset);
            if (usersList) {
                setUsers(prev => {
                    const existingIds = new Set(prev.map(u => u.id));
                    const newUsers = usersList.data.filter(u => !existingIds.has(u.id));
                    return [...prev, ...newUsers];
                });
                setHasMore(usersList.hasMore);
            }
        } catch (error) {
            console.error("Error Fetching users: ", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    React.useEffect(() => {
        if (!fetchedRef.current || page > 1) {
            fetchUsers();
            fetchedRef.current = true;
        }
    }, [page]);
    
    const isInactive = (dateString) => {
        const lastDate = parseDate(dateString);
        const now = new Date();
        const diffInDays = (now - lastDate) / (1000 * 60 * 60 * 24);
        return diffInDays > 30;
    };
    
    // Filtrage des utilisateurs selon la recherche et le rôle
    const filteredUsers = users.filter(user => {
        const search = inputSearch.toLowerCase();
        
        const matchesSearch =
        user.firstName?.toLowerCase().includes(search) ||
        user.lastName?.toLowerCase().includes(search) ||
        user.username?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.roles[0]?.toLowerCase().includes(search) ||
        user.createdAt?.toLowerCase().includes(search) ||
        user.lastConnected?.toLowerCase().includes(search);
        
        if (inputSearch && !matchesSearch) return false;
        
        switch (filterRole) {
            case "Admin":
            return user.roles?.includes("ROLE_ADMIN") || user.roles?.includes("ROLE_SUPER_ADMIN");
            case "Utilisateur":
            return user.roles?.includes("ROLE_USER");
            case "Inactif":
            return isInactive(user.lastConnected);
            case "Tous":
            default:
            return true;
        }
    });
    
    const allSelected = filteredUsers.length > 0 && filteredUsers.every(user => checkedUsers.has(user.id));
    
    // Gestion des checkbox
    const toggleCheckUser = (id) => {
        setCheckedUsers(prev => {
            const newChecked = new Set(prev);
            if (newChecked.has(id)) {
                newChecked.delete(id);
            } else {
                newChecked.add(id);
            }
            return newChecked;
        });
    };
    
    const selectAll = (checked) => {
        if (checked) {
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
    
    return {
        users,
        filteredUsers,
        inputSearch,
        setInputSearch,
        checkedUsers,
        setCheckedUsers,
        toggleCheckUser,
        selectAll,
        allSelected,
        filterRole,
        setFilterRole,
        isLoading,
        hasMore,
        page,
        setPage,
        fetchUsers,
    };
};