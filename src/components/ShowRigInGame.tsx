
import React, { useContext } from 'react';
import { RigContext, RigObject } from '../context/RigContext';
import ShowDetails from './ShowDetails';

interface Props {
    selectedRig: RigObject;
    index: number;
}

const ShowRigInGame: React.FC<Props> = (props: Props): React.ReactElement => {

    const {
        rigTestObject,
        setRigTestObject,
        mobileDetails
    } = useContext(RigContext);

    if (props.selectedRig) {
        let colors = {
            background: 'darkRed',
            color: 'white'
        }

        if (props.index > 0) {
            colors.background = 'navy';
            colors.color = 'white';
        }

        /* this does not do anything... 
            but could be usefull later on...
        */
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
                        <p style={colors}>
                            {props.selectedRig.name}<br />
                        </p>
                        <div>
                            Damage: <input type="number" style={{ width: 35 }} />
                            Momentum: <input type="number" style={{ width: 35 }} />
                            Points gained: <input type="number" style={{ width: 150 }} />
                            <input type="checkbox" />underdog<input type="checkbox" />
                            Primers: <input type="number" style={{ width: 35, background: 'cyan' }} />
                            <br />
                            flares used: <input type="checkbox" /><input type="checkbox" /><input type="checkbox" /><input type="checkbox" />
                            <span style={{ color: "darkRed" }}> obscured: <input type="checkbox" /></span>
                            <br />
                            driver special used: r1 <input type="checkbox" /> r2<input type="checkbox" />r3<input type="checkbox" />
                            gunner special used: r1 <input type="checkbox" /> r2<input type="checkbox" />r3<input type="checkbox" />
                            <br />
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
                                        Damage: <input type="number" style={{ width: 35 }} />
                                        Momentum: <input type="number" style={{ width: 35 }} />
                                        {
                                            (!rigTestObject.familiarOne.enabled || !rigTestObject.familiarTwo.enabled) ?
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            const updatedPlayers = [...rigTestObject.players];

                                                            if (rigTestObject.familiarOne.enabled &&
                                                                !rigTestObject.familiarTwo.enabled
                                                            ) {
                                                                updatedPlayers.push({
                                                                    type: 'familiar',
                                                                    x: 0,
                                                                    y: 0,
                                                                    heading: 0,
                                                                    charred: false,
                                                                    enabled: true,
                                                                    name: 'familiar 2'
                                                                });
                                                                setRigTestObject({
                                                                    ...rigTestObject,
                                                                    players: updatedPlayers,
                                                                    familiarTwo: {
                                                                        ...rigTestObject.familiarTwo,
                                                                        enabled: true,
                                                                        name: 'familiar 2'
                                                                    }
                                                                });
                                                            } else if (
                                                                !rigTestObject.familiarOne.enabled
                                                            ) {
                                                                updatedPlayers.push({
                                                                    type: 'familiar',
                                                                    x: 0,
                                                                    y: 0,
                                                                    heading: 0,
                                                                    charred: false,
                                                                    enabled: true,
                                                                    name: 'familiar 1'
                                                                });
                                                                setRigTestObject({
                                                                    ...rigTestObject,
                                                                    players: updatedPlayers,
                                                                    familiarOne: {
                                                                        ...rigTestObject.familiarTwo,
                                                                        enabled: true,
                                                                        name: 'familiar 1'
                                                                    }
                                                                });
                                                            }
                                                        }}
                                                    >add familiar to game</button>
                                                </> : <></>
                                        }

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