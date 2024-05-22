'use client';
import { create } from 'zustand';

type State = {
    type: 'success' | 'error' | 'info' | 'warning';
    active: boolean;
    alertMessage: string;
    duration: number;
};

type Actions = {
    setAlert: (
        type: 'success' | 'error' | 'info' | 'warning',
        message: string
    ) => void;
    onClose: () => void;
};

const useAlertsStore = create<State & Actions>((set) => ({
    type: 'info',
    active: false,
    alertMessage: '',
    duration: 3000,
    onClose: () =>
        set((state) => ({
            active: false,
            alertMessage: '',
        })),
    setAlert: (type, message) =>
        set((state) => ({
            active: true,
            alertMessage: message,
            type: type,
        })),
}));

export default useAlertsStore;
