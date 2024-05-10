import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { RigContext } from '../context/RigContext';

interface mDbuttonProps {
    activateWhat: 'mobile' | 'laptop';
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
    const { device, setDevice } = useContext(RigContext);
    
    return (
        <>
            <Button sx={
                (device === props.activateWhat) ?
                    styles.activated :
                    styles.disabled
            }
            onClick={ () => {
                setDevice(props.activateWhat);
            }}
            >
                {props.activateWhat} mode
            </Button>
        </>
    );
}

export default ModeButton;