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
            {/*
              <Button
                onClick={() => { setMode('rules'); }}
                sx={{
                    color: 'gray',
                    background: 'rgb(40,40,40)',
                    margin: 0.5
                }}
              >rules</Button>*/
            }
            <Button
                onClick={() => { setMode('lore'); }}
                sx={{
                    color: 'gold',
                    background: 'rgb(40,40,40)',
                    margin: 0.5
                }}
            >(Stories)
            </Button>

            <Button
                sx={{
                    color: 'red',
                    background: 'rgb(40,40,40)',
                    margin: 0.5
                }}
                onClick={goOfficialSite}
            >(Official site)
            </Button>

            <Button
                sx={{
                    color: 'gold',
                    background: 'rgb(40,40,40)',
                    margin: 0.5
                }}
                onClick={() => { setMode('famousRigs'); }}
            >(Famous rigs)
            </Button>
        </>
    );
}

export default Links;