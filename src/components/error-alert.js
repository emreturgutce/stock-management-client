import { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

const ErrorAlert = ({ errors }) => {
    const [open, setOpen] = useState(true);

    return (
        <Collapse in={open}>
            <Alert severity='error' onClose={() => setOpen(false)}>
                <AlertTitle>Error</AlertTitle>
                {errors.map((error) => error)}
            </Alert>
        </Collapse>
    );
};

export default ErrorAlert;
