import React, { useEffect, useState } from 'react';
import { FamousRig } from './FamousRigs';

interface DescOfRigProps {
    readAbout: string;
    listOfFamousRigs: FamousRig[];
};

const DescOfRig: React.FC<DescOfRigProps> = ({ readAbout, listOfFamousRigs }): React.ReactElement => {
    const [selectedRig, setSelectedRig] = useState<FamousRig>(listOfFamousRigs[0]);

    useEffect(() => {
        const foundRig: FamousRig | undefined = listOfFamousRigs.find((r: FamousRig) => r.name === readAbout);

        if (foundRig) {
            setSelectedRig(foundRig);
        }

    }, [readAbout, listOfFamousRigs]);

    if (selectedRig) {
        return (
            <>
                <h4 style={{ color: 'gold' }}>{readAbout}</h4>
                <p>{selectedRig?.desc}</p>
                {selectedRig?.image && (
                    <img
                        src={`${process.env.PUBLIC_URL}/img/${selectedRig?.image}.png`}
                        alt={`${selectedRig.name} description`}
                        style={{ maxWidth: '200px' }}
                    />
                )}
            </>
        );
    } else { return (<></>); }

}

export default DescOfRig;