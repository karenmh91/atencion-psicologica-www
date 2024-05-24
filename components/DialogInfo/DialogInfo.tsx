import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

type props = {
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
};

const DialogInfo = ({ content, title, isOpen, onClose }: props) => {
    return (
        <>
            <Dialog open={isOpen} fullWidth maxWidth="sm" disableEscapeKeyDown>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="w-full flex justify-center">
                        <button
                            onClick={() => {
                                onClose();
                            }}
                            className="px-4 py-2 bg-black text-white hover:bg-gray-900 focus:bg-gray-800 rounded-md"
                        >
                            Enterado
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DialogInfo;
