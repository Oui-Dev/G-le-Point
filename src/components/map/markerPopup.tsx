import { useEffect, useState, useMemo } from 'react';
import { ExclamationTriangleIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';
import {
    ExclamationTriangleIcon as ExclamationTriangleIconOutline,
    HandThumbUpIcon as HandThumbUpIconOutline,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { Popup } from 'react-map-gl';
import { Marker } from '@/types/index';
import { debounce } from '@/lib/utils';
import useMarkerStore from '@/stores/markerStore';
import useUserStore from '@/stores/userStore';

export default function MarkerPopup({
    marker,
    setSelectedMarker
}: {
    marker: Marker;
    setSelectedMarker: (marker: Marker | null) => void;
}) {
    const { currentUser } = useUserStore();
    const { friendsMarkers, groupsMarkers, publicMarkers, toggleLikeMarker, toggleReportMarker } = useMarkerStore();

    const [currentMarker, setCurrentMarker] = useState(marker);

    useEffect(() => {
        if (marker.id === currentMarker.id) return;
        setCurrentMarker(marker);
    }, [marker, currentMarker]);

    const isLiked = useMemo(() => currentMarker.likedBy.includes(currentUser?.uid ?? ''), [currentMarker, currentUser]);
    const isReported = useMemo(() => currentMarker.reportedBy.includes(currentUser?.uid ?? ''), [currentMarker, currentUser]);

    useEffect(() => {
        // Keep the local marker data in sync with the store when the user likes or reports the marker
        const updatedMarker = [...friendsMarkers, ...groupsMarkers, ...publicMarkers].find((m) => m.id === marker.id);

        if (updatedMarker) setCurrentMarker(updatedMarker);
    }, [friendsMarkers, groupsMarkers, publicMarkers, marker.id]);

    const handleLike = () => {
        if (!currentUser || !currentMarker) return;
        debounce(() => toggleLikeMarker(currentMarker.id, currentUser.uid));
    };

    const handleReport = () => {
        if (!currentUser || !currentMarker) return;
        debounce(() => toggleReportMarker(currentMarker.id, currentUser.uid));
    };

    const closePopup = () => {
        setSelectedMarker(null);
    };

    return (
        <Popup
            longitude={currentMarker.longitude}
            latitude={currentMarker.latitude}
            closeButton={false}
            closeOnClick={false}
            offset={24}
            anchor="bottom"
            maxWidth="400px"
            className="w-full p-2"
        >
            <div className="bg-white p-4 rounded-lg shadow-lg relative">
                <XMarkIcon onClick={closePopup} className="absolute top-1 right-1 h-5 w-5 cursor-pointer" />
                <div className="flex w-full items-center justify-between gap-6">
                    <div className="flex-1 flex items-center gap-3">
                        <h3 className="truncate text-sm font-semibold text-gray-900 !my-0">{currentMarker.name}</h3>
                        <span className="inline-flex truncate flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {currentMarker.tags}
                        </span>
                    </div>
                    <p className="!leading-6">Par : {currentMarker.user.username}</p>
                </div>
                <p className="mt-1 text-sm !leading-5 text-gray-500">
                    {currentMarker.description || 'Aucune description'}
                </p>
                { currentMarker.user.uid !== currentUser?.uid && (
                    <div className="mt-4 flex justify-around gap-4">
                        <button onClick={handleLike} className="inline-flex gap-2">
                            {isLiked ? (
                                <HandThumbUpIcon className="h-6 w-6 text-glp-green" />
                            ) : (
                                <HandThumbUpIconOutline className="h-6 w-6 text-glp-green" />
                            )}
                            <span className="text-glp-green">{currentMarker.likeCount}</span>
                        </button>
                        <button onClick={handleReport} className="inline-flex gap-2">
                            {isReported ? (
                                <>
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-500"></ExclamationTriangleIcon>
                                    <span className="text-red-500">Annuler le signalement</span>
                                </>
                            ) : (
                                <>
                                    <ExclamationTriangleIconOutline className="h-6 w-6 text-red-500 text-md bg-white border-glp-red cursor-pointer"></ExclamationTriangleIconOutline>
                                    <span className="text-red-500">Signaler</span>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </Popup>
    );
}
