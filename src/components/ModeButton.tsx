import { Button } from '@mui/material';
import React from 'react';

interface mDbuttonProps {
    activateWhat: 'mobile' | 'laptop';
    device: 'mobile' | 'laptop';
    setDevice: (value: any) => void;
};

const styles = ({
    activated: {
        backgroundColor: "rgb(0,0,0)",
        color: 'rgb(57,255,20)',
        margin: "1px"
    },
    disabled: {
        backgroundColor: "rgb(0,0,0)",
        color: 'rgb(100,100,100)',
        margin: "1px"
    }
});

const ModeButton: React.FC<mDbuttonProps> = (props: mDbuttonProps): React.ReactElement => {
    return (
        <>
            <Button sx={
                (props.device === props.activateWhat) ?
                    styles.activated :
                    styles.disabled
            }
            onClick={ () => {
                console.log('cliked');
                props.setDevice(props.activateWhat);
            }}
            >
                {props.activateWhat} mode
            </Button>
        </>
    );
}

export default ModeButton;