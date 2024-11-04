import React, { useEffect, useState } from 'react';
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { UserDetails } from "./components/user-details";
import ErrorMessage from "./components/error-message";
import { useFetchUsers } from "./hooks/useFetchUsers";

const App = () => {
    const {
        data: users,
        error,
        loading,
    } = useFetchUsers("http://127.0.0.1:8000/users/");
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUsers, setCurrentUsers] = useState([]);

    useEffect(() => {
        setCurrentUsers(users);
    }, [users]);

    if (loading) return <div className="text-gray-500">Loading...</div>;

    return error ? (
        <ErrorMessage message="There was an error fetching data from the server." />
    ) : (
        <div className="overflow-x-hidden">
            <Header />
            <div className="flex min-h-screen bg-[rgb(9,16,45)]">
                <Sidebar users={currentUsers} onUserSelect={setSelectedUser} />
                <main className="w-3/4 p-4">
                    {selectedUser ? (
                        <UserDetails user={selectedUser} onUserUpdate={setSelectedUser} onUsersUpdate={setCurrentUsers}/>
                    ) : (
                        <h1 className="text-[rgb(234,96,32)] p-4">Select a user to see details</h1>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;
