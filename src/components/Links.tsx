import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { RigContext } from '../context/RigContext';

const Links: React.FC = (): React.ReactElement => {
    const { setMode } = useContext(RigContext);
    const goOfficialSite = (): void => {
        window.open('https://www.charredaxle.com', '_blank');
    }
    return (
        <>
            {
                /* rules section not made yet
              <Button
                onClick={() => { setMode('rules'); }}
              >rules</Button>        
                */
            }
            <Button
                onClick={() => { setMode('lore'); }}
                sx={{
                    color: 'gold',
                    background: 'rgb(40,40,40)',
                    margin: 0.5
                }}
            >(Stories)</Button>
            <Button
                sx={{
                    color: 'darkRed',
                    background: 'rgb(40,40,40)'
                }}
                onClick={goOfficialSite}
            >(Charred Axle official site)</Button>
        </>
    );
}

export default Links;