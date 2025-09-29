import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Store } from '../types';
import StoreCard from '../components/StoreCard';
import { Search } from 'lucide-react';

const UserDashboard: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/stores?name=${searchTerm}&address=${searchTerm}`);
                setStores(response.data);
            } catch (error) {
                console.error("Failed to fetch stores:", error);
            } finally {
                setLoading(false);
            }
        };
        const debounceFetch = setTimeout(() => fetchStores(), 300);
        return () => clearTimeout(debounceFetch);
    }, [searchTerm]);

    const onRatingUpdate = (storeId: string, newAverage: number) => {
        setStores(prevStores => prevStores.map(s => s.id === storeId ? {...s, averageRating: newAverage} : s));
    }

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">Explore Stores</h1>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by store name or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {loading ? (
                <p>Loading stores...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stores.map(store => (
                        <StoreCard key={store.id} store={store} onRatingUpdate={onRatingUpdate} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
