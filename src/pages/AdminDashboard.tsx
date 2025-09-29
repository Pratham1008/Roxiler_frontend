import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { Store, UserDetails } from '../types';
import { UserPlus, Building, Edit, Trash2 } from 'lucide-react';
import UserModal from '../components/UserModal';
import StoreModal from '../components/StoreModal';

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [isStoreModalOpen, setStoreModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserDetails | null>(null);
    const [editingStore, setEditingStore] = useState<Store | null>(null);

    const fetchData = useCallback(async () => {
        const usersRes = await api.get('/users');
        const storesRes = await api.get('/stores');
        setUsers(usersRes.data);
        setStores(storesRes.data);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUserSave = () => {
        setUserModalOpen(false);
        setEditingUser(null);
        fetchData();
    };

    const handleStoreSave = () => {
        setStoreModalOpen(false);
        setEditingStore(null);
        fetchData();
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <UserPlus className="w-10 h-10 text-blue-500"/>
                    <div>
                        <p className="text-gray-500">Total Users</p>
                        <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <Building className="w-10 h-10 text-green-500"/>
                    <div>
                        <p className="text-gray-500">Total Stores</p>
                        <p className="text-2xl font-bold">{stores.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Users</h2>
                    <button onClick={() => { setEditingUser(null); setUserModalOpen(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"><UserPlus size={18} /> Add User</button>
                </div>
                <UserTable users={users} onEdit={(user) => { setEditingUser(user); setUserModalOpen(true); }} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Stores</h2>
                    <button onClick={() => { setEditingStore(null); setStoreModalOpen(true); }} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"><Building size={18} /> Add Store</button>
                </div>
                <StoreTable stores={stores} onEdit={(store) => { setEditingStore(store); setStoreModalOpen(true); }} />
            </div>

            {isUserModalOpen && <UserModal user={editingUser} onClose={() => setUserModalOpen(false)} onSave={handleUserSave} />}
            {isStoreModalOpen && <StoreModal store={editingStore} onClose={() => setStoreModalOpen(false)} onSave={handleStoreSave} />}
        </div>
    );
};

const UserTable: React.FC<{ users: UserDetails[], onEdit: (user: UserDetails) => void }> = ({ users, onEdit }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
            <thead>
            <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'ADMIN' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}`}>{user.role}</span></td>
                    <td className="py-2 px-4 border-b">
                        <button onClick={() => onEdit(user)} className="text-blue-500 hover:text-blue-700"><Edit size={18}/></button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

const StoreTable: React.FC<{ stores: Store[], onEdit: (store: Store) => void }> = ({ stores, onEdit }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
            <thead>
            <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Avg. Rating</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
            </thead>
            <tbody>
            {stores.map(store => (
                <tr key={store.id}>
                    <td className="py-2 px-4 border-b">{store.name}</td>
                    <td className="py-2 px-4 border-b">{store.email}</td>
                    <td className="py-2 px-4 border-b">{store.averageRating.toFixed(1)}</td>
                    <td className="py-2 px-4 border-b">
                        <button onClick={() => onEdit(store)} className="text-blue-500 hover:text-blue-700"><Edit size={18}/></button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);


export default AdminDashboard;

