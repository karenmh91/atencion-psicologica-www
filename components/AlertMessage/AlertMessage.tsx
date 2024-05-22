'use client';
import { SlideTransition } from '../Transitions/transitions';
import { Alert, Snackbar } from '@mui/material';
import useAlertsStore from '@/store/storeAlerts';

const AlertMessage = () => {
    const { active, alertMessage, onClose, type, duration } = useAlertsStore(
        (state) => state
    );

    return (
        <Snackbar
            open={active}
            autoHideDuration={duration}
            onClose={() => {
                onClose();
            }}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Alert severity={type} variant="filled" sx={{ width: '100%' }}>
                {alertMessage}
            </Alert>
        </Snackbar>
    );
};

export default AlertMessage;
