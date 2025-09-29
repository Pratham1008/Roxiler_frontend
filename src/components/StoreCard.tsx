import React, { useState, useEffect } from 'react';
import { Store, Rating } from '../types';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Star, MapPin } from 'lucide-react';

interface StoreCardProps {
    store: Store;
    onRatingUpdate: (storeId: string, newAverage: number) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onRatingUpdate }) => {
    const { user } = useAuth();
    const [userRatingValue, setUserRatingValue] = useState<number | null>(null);
    const [isRatingMode, setRatingMode] = useState(false);

    useEffect(() => {
        const currentUserRating = store.ratings?.find(r => r.user.id === user?.userId)?.ratingValue;
        setUserRatingValue(currentUserRating || null);
    }, [store, user]);

    const handleSetRating = async (rating: number) => {
        if (!user) return;
        try {
            await api.post(`/ratings/${user.userId}`, { storeId: store.id, ratingValue: rating });
            setUserRatingValue(rating);
            setRatingMode(false);

            const updatedStore = await api.get(`/stores/${store.id}`);
            onRatingUpdate(store.id, updatedStore.data.averageRating);
            toast.success('Rating submitted!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 truncate">{store.name}</h3>
                <div className="flex items-center mt-2 text-gray-500">
                    <MapPin size={16} className="mr-2"/>
                    <p className="text-sm truncate">{store.address}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-600">Average Rating</span>
                        <div className="flex items-center">
                            <span className="font-bold text-yellow-500 mr-1">{store.averageRating.toFixed(1)}</span>
                            <Star size={20} className="text-yellow-400 fill-current" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-600">Your Rating</span>
                        <div onMouseEnter={() => setRatingMode(true)} onMouseLeave={() => setRatingMode(false)}>
                            <StarRating currentRating={userRatingValue} isRatingMode={isRatingMode} onRate={handleSetRating} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StarRating: React.FC<{currentRating: number | null, isRatingMode: boolean, onRate: (r:number) => void}> = ({currentRating, isRatingMode, onRate}) => {
    const [hoverRating, setHoverRating] = useState(0);
    const displayRating = hoverRating || currentRating || 0;

    return (
        <div className="flex">
            {[1,2,3,4,5].map(star => (
                <button key={star} onClick={() => onRate(star)} onMouseEnter={() => isRatingMode && setHoverRating(star)} onMouseLeave={() => isRatingMode && setHoverRating(0)}>
                    <Star size={20} className={`transition-colors ${star <= displayRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                </button>
            ))}
        </div>
    )
}

export default StoreCard;
