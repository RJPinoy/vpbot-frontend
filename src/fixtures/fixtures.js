export const userTest = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@test.com",
    role: "SUPERADMIN",
    img: "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    createdAt: "01/01/2000 00:00",
    lastConnection: "01/01/2025 00:00",
};

export const groupUsers = () => {
    let users = {};

    for (let index = 0; index < 20; index++) {
        users[index] = {
            id: index,
            firstName: "user" + index,
            lastName: "user" + index,
            username: "user" + index,
            email: "user" + index + "@test.test",
            role: "USER",
            img: "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            createdAt: "01/01/2000 00:00",
            lastConnection: "01/01/2025 00:00",
        };
    }

    return users;
}