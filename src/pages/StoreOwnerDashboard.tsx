import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Store, Rating } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Star, MessageSquare } from 'lucide-react';

const StoreOwnerDashboard: React.FC = () => {
    const { user } = useAuth();
    const [stores, setStores] = useState<Store[]>([]);
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);

    useEffect(() => {
        if (user) {
            api.get(`/users/${user.userId}?relations=stores`).then(response => {
                setStores(response.data.stores || []);
                if (response.data.stores?.length > 0) {
                    api.get(`/stores/${response.data.stores[0].id}`).then(storeDetails => {
                        setSelectedStore(storeDetails.data);
                    })
                }
            });
        }
    }, [user]);

    const handleSelectStore = (storeId: string) => {
        api.get(`/stores/${storeId}`).then(res => setSelectedStore(res.data));
    }

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">Owner Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-semibold mb-4">Your Stores</h2>
                    <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
                        {stores.map(store => (
                            <button key={store.id} onClick={() => handleSelectStore(store.id)} className={`w-full text-left p-3 rounded-lg ${selectedStore?.id === store.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>
                                {store.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3">
                    {selectedStore ? (
                        <StoreDetails store={selectedStore} />
                    ) : (
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h2 className="text-2xl font-semibold">Select a store to view its details.</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StoreDetails: React.FC<{ store: Store }> = ({ store }) => (
    <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
            <h2 className="text-3xl font-bold">{store.name}</h2>
            <p className="text-gray-500">{store.address}</p>
        </div>
        <div className="flex items-center space-x-2">
            <Star className="text-yellow-400" />
            <span className="text-xl font-semibold">Average Rating: {store.averageRating.toFixed(1)} / 5</span>
        </div>

        <div>
            <h3 className="text-2xl font-semibold mb-4">Recent Ratings</h3>
            <div className="space-y-4">
                {store.ratings && store.ratings.length > 0 ? store.ratings.map(rating => (
                    <div key={rating.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{rating.user.name}</p>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={i < rating.ratingValue ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                                ))}
                            </div>
                        </div>
                    </div>
                )) : <p>No ratings submitted yet.</p>}
            </div>
        </div>
    </div>
)

export default StoreOwnerDashboard;
