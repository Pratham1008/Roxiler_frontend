import React, { useState, useEffect } from 'react';
import { Store, UserDetails } from '../types';
import api from '../services/api';
import toast from 'react-hot-toast';

interface Props {
    store: Store | null;
    onClose: () => void;
    onSave: () => void;
}

const StoreModal: React.FC<Props> = ({ store, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [ownerId, setOwnerId] = useState<string | undefined>(undefined);
    const [users, setUsers] = useState<UserDetails[]>([]);

    useEffect(() => {
        api.get('/users').then(res => setUsers(res.data));
        if (store) {
            setName(store.name);
            setEmail(store.email);
            setAddress(store.address);
            setOwnerId(store.owner?.id);
        }
    }, [store]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const storeData = { name, email, address, ownerId };
        try {
            if (store) {
                await api.patch(`/stores/${store.id}`, storeData);
                toast.success('Store updated successfully!');
            } else {
                await api.post('/stores', storeData);
                toast.success('Store created successfully!');
            }
            onSave();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">{store ? 'Edit Store' : 'Add Store'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
                    <textarea placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} className="w-full p-2 border rounded" />
                    <select value={ownerId} onChange={e => setOwnerId(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Select Owner (Optional)</option>
                        {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                    </select>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreModal;
