import React, { useState, useEffect } from 'react';
import { UserDetails } from '../types';
import api from '../services/api';
import toast from 'react-hot-toast';

interface Props {
    user: UserDetails | null;
    onClose: () => void;
    onSave: () => void;
}

const UserModal: React.FC<Props> = ({ user, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAddress(user.address);
            setPassword('');
        } else {
            setName('');
            setEmail('');
            setAddress('');
            setPassword('');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = { name, email, address, ...(password && { password }) };
        try {
            if (user) {
                await api.patch(`/users/${user.id}`, userData);
                toast.success('User updated successfully!');
            } else {
                await api.post('/users', userData);
                toast.success('User created successfully!');
            }
            onSave();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">{user ? 'Edit User' : 'Add User'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required/>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required/>
                    <input type="password" placeholder={user ? "New Password (optional)" : "Password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required={!user} />
                    <textarea placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} className="w-full p-2 border rounded" />
                    <div className="flex justify-end space-x-4 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
