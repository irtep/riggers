
import React, { useContext } from 'react';
import { MobileDetails, RigContext, RigObject } from '../context/RigContext';
import { Weapon, weapons } from '../data/weapons';
import ShowDetails from './ShowDetails';
import { Modification, rigModifications, weaponModifications } from '../data/modifications';
import { ConcealedWeapons, DriverSpecial, concealedWeapons, driverSpecials } from '../data/driverSpecials';
import { GunnerSpecial, gunnerSpecials } from '../data/gunnerSpecials';
import { Mine, mines } from '../data/mines';
import { familiarModifications, familiarWeapons } from '../data/familiar';

interface Props {
    selectedRig: RigObject
}

const ShowRigInGame: React.FC<Props> = (props: Props): React.ReactElement => {

    const { rigObject,
        setMobileDetails,
        mobileDetails,
        stripParentheses
    } = useContext(RigContext);

    const handleDetails = (name: string, type: string): void => {

        let fullDetails: MobileDetails = {
            name: name,
            type: type,
            fullDetails: ''
        };

        switch (type) {
            case 'weapon':
                const getWeapon = weapons.filter((w: Weapon) => w.name === stripParentheses(name));
                fullDetails.fullDetails = getWeapon[0]
                break;
            case 'modification':
                const getMod = rigModifications.concat(weaponModifications).filter((w: Modification) => w.name === stripParentheses(name));
                fullDetails.fullDetails = getMod[0]
                break;
            case 'driverSpecial':
                const driSpecial = driverSpecials.filter((w: DriverSpecial) => w.name === stripParentheses(name));
                fullDetails.fullDetails = driSpecial[0]
                break;
            case 'gunnerSpecial':
                const gunnerSpecial = gunnerSpecials.filter((w: GunnerSpecial) => w.name === stripParentheses(name));
                fullDetails.fullDetails = gunnerSpecial[0]
                break;
            case 'mine':
                const mine = mines.filter((w: Mine) => w.name === stripParentheses(name));
                fullDetails.fullDetails = mine[0]
                break;
            case 'familiarStuff':
                const famStuff: (Weapon | Modification)[] = ([] as (Weapon | Modification)[]).concat(familiarWeapons, familiarModifications).filter((w: Weapon | Modification) => w.name === stripParentheses(name));
                fullDetails.fullDetails = famStuff[0];
                break;
            case 'concealedWeapon':
                const concealedW = concealedWeapons.filter((w: ConcealedWeapons) => w.name === stripParentheses(name));
                fullDetails.fullDetails = concealedW[0]
                break;

            default: console.log('not found: ', type);
        };

        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileDetails(fullDetails);
    }

    if (props.selectedRig) {

        if (mobileDetails.name !== '') {
            return (
                <div style={{ margin: 1, fontSize: 12 }}>
                    <ShowDetails
                        item={mobileDetails.fullDetails}
                    />
                </div>
            )
        } else {
            return (
                <>
                    <div style={{ margin: 1, fontSize: 12 }}>
                        <p style={{
                            background: "black", color: "orange", fontWeight: "strong", margin: 0, padding: 1
                        }}>
                            {props.selectedRig.name}<br />
                        </p>
                        <div>
                            Damage: <input type="number" style={{width: 35}}/>
                            Momentum: <input type="number" style={{width: 35}} />
                            flares used: <input type="checkbox"/><input type="checkbox"/><input type="checkbox"/><input type="checkbox"/><br/>
                            driver special used: r1 <input type="checkbox"/> r2<input type="checkbox"/>r3<input type="checkbox"/> 
                            gunner special used: r1 <input type="checkbox"/> r2<input type="checkbox"/>r3<input type="checkbox"/><br/>
                        </div>
                        <p style={{ margin: 1 }}>
                            Speed: <span style={{ color: "darkRed", margin: 2 }}>{props.selectedRig.realSpeed}</span>
                            Armour: <span style={{ color: "darkRed", margin: 2 }}>{props.selectedRig.armour}</span>
                            Handling: <span style={{ color: "darkRed", margin: 2 }}>{props.selectedRig.handling}</span>
                            {
                                props.selectedRig.resistanceFields > 0 ?
                                    <>
                                        Resistance fields: <span style={{ color: "darkRed" }}>{props.selectedRig.resistanceFields}</span></> :
                                    <></>
                            }
                        </p>
                        <p style={{ margin: 1 }}>
                            {
                                props.selectedRig.selectedWeapons.map((w: string, i: number) => {
                                    return (
                                        <span
                                            key={`sW: ${i}`}
                                            style={{ margin: 1 }}
                                        >
                                            {w}.
                                        </span>
                                    )
                                })
                            }
                                                    {
                            props.selectedRig.mods.map((m: string, i: number) => {
                                if (!m.includes('Armour Plating') &&
                                    !m.includes('Resistance Field')) {
                                    return (
                                        <span
                                            key={`sm: ${i}`}
                                            style={{ margin: 1 }}
                                        >
                                            {m}.
                                        </span>
                                    )
                                }
                            })
                        }
                        </p>
                    </div>

                    <div style={{ margin: 1, fontSize: 12 }}>
                        {
                            (props.selectedRig.driverSpecial.length > 0) ?
                                <>
                                    <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                        Driver special:
                                    </span>
                                    {props.selectedRig.driverSpecial}.
                                </> : <></>
                        }
                        {
                            (props.selectedRig.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                                <>
                                    <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                        Gunner:
                                    </span>
                                    {props.selectedRig.gunnerSpecial}.
                                </> : <></>
                        }
                        {
                            (props.selectedRig.mods.filter((mod: string) => mod === 'Mine Launcher').length === 1) ?
                                <>
                                    <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                        Mines:
                                    </span>
                                    {props.selectedRig.mines.map((mine: string, indx: number) => {
                                        return (
                                            <span key={`mine:${indx}`}>
                                                {mine}.
                                            </span>
                                        )
                                    })}
                                </> : <></>
                        }
                        {
                            (props.selectedRig.gunnerSpecial.includes('Familiar') && props.selectedRig.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                                <>
                                    <div style={{ background: "darkRed", color: "white", fontWeight: "strong", padding: 1 }}>
                                        Familiar:
                                    </div>
                                    <div>
                                        Damage: <input type="number" style={{width: 35}} />
                                        Momentum: <input type="number" style={{width: 35}} />
                                    </div>
                                    <span>
                                        Speed: <span style={{ color: "darkRed" }}>{props.selectedRig.familiarStats.speed}</span> Armour: <span style={{ color: "darkRed" }}>{props.selectedRig.familiarStats.armour}</span>.
                                    </span>
                                    {
                                        props.selectedRig.familiar?.map((fa: string, indx: number) => {
                                            return (
                                                <span key={`faStuff ${indx}`}>
                                                    {fa}.
                                                </span>
                                            )
                                        })
                                    }
                                </> : <></>
                        }
                        {
                            (props.selectedRig.concealedWeapon.length > 0) ?
                                <>
                                    <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                        Concealed weapon:
                                    </span>
                                    {props.selectedRig.concealedWeapon}.
                                </> : <></>
                        }
                        {
                            (props.selectedRig.gunnerSpecial.includes('The right tool')) ?
                                <>
                                    <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                        Right tool weapon:
                                    </span>
                                    {props.selectedRig.rightTool}.
                                </> : <></>
                        }
                    </div>
                </>
            );
        }
    } else {
        return (<></>);
    }
}

export default ShowRigInGame;