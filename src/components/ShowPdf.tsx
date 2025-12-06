import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { RigContext } from '../context/RigContext';
import { Weapon, weapons } from '../data/weapons';
import { Modification, rigModifications, weaponModifications } from '../data/modifications';
import { Chassis, chassises } from '../data/chassises';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Mine, mines } from '../data/mines';

const ShowPdf: React.FC = (): React.ReactElement => {
    const [matchingChassis, setMatchingChassis] = useState<Chassis>({
        name: '',
        specials: '',
        desc: '',
        type: 'car'
    });

    const pdfRef = useRef<HTMLDivElement | null>(null);

    const { rigObject,
        setHovered,
        stripParentheses,
        setMode,
        anteriorMode
    } = useContext(RigContext);

    const downloadPDF = async () => {
        const input = pdfRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgHeight / imgWidth;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfWidth * ratio);
        pdf.save(`${rigObject.name || 'rig'}.pdf`);
    };

    const uniqueByName = <T extends { name: string }>(arr: T[]) =>
        Array.from(
            new Map(arr.map(item => [item.name, item])).values()
        );

    const weaponRules = uniqueByName(
        rigObject.selectedWeapons
            .map((name: any) => weapons.find(w => w.name === stripParentheses(name)))
            .filter(Boolean)
    );

    useEffect(() => {
        if (rigObject.chassis !== matchingChassis.name) {
            const matchedChassis = chassises.find(chassis => chassis.name === rigObject.chassis);

            if (matchedChassis) {
                setMatchingChassis(matchedChassis);
            }

        }
    }, [rigObject]);

    if (rigObject) {
        return (
            <Container
                sx={{
                    background: "white"
                }}
            >
                <Button
                    sx={{
                        background: 'darkRed',
                        color: 'white',
                        margin: 1
                    }}
                    onClick={() => {
                        setMode(anteriorMode);
                    }}
                >
                    back
                </Button>
                <Button
                    sx={{
                        border: '1px solid orange',
                        color: 'black',
                        margin: 0.5
                    }}
                    onClick={downloadPDF}
                >
                    Save as PDF
                </Button>
                <div ref={pdfRef}>
                    <Grid container spacing={3} margin={3}>
                        <Grid item xs={3}>
                            <Container>
                                <Typography sx={{
                                    background: "black", color: "orange", fontWeight: "strong", padding: 1
                                }}>
                                    Name of rig: {rigObject.name}<br />
                                </Typography>
                                <Typography>
                                    Chassis: <span style={{ color: "darkgreen" }}>{rigObject.chassis}</span><br />
                                </Typography>

                                <Typography>
                                    Chassis special: <span style={{ color: "darkgreen" }}>{matchingChassis.specials}</span><br />
                                </Typography>

                                <Typography>
                                    Speed: <span style={{ color: "darkgreen" }}>{rigObject.speed}</span><br />
                                    Speed in game: <span style={{ color: "darkgreen" }}>{rigObject.realSpeed}</span><br />
                                </Typography>
                                <Typography>
                                    Armour: <span style={{ color: "darkgreen" }}>{rigObject.armour}</span><br />
                                </Typography>
                                <Typography>
                                    Handling: <span style={{ color: "darkgreen" }}>{rigObject.handling}</span><br />
                                </Typography>
                                <Typography>
                                    Resistance fields: <span style={{ color: "darkgreen" }}>{rigObject.resistanceFields}</span><br />
                                </Typography>
                                <Typography>
                                    Empty mod slots: <span style={{ color: "darkgreen" }}>{rigObject.emptySlots}</span><br />
                                </Typography>
                            </Container>
                        </Grid>
                        <Grid item xs={3}>

                            <Container>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Weapons:
                                </span>
                                {
                                    rigObject.selectedWeapons.map((w: string, i: number) => {
                                        return (
                                            <Typography
                                                onMouseEnter={() => {
                                                    // find details of this weapon
                                                    const foundWeapon: Weapon[] = weapons.filter((wep: Weapon) => wep.name === stripParentheses(w));
                                                    setHovered(foundWeapon[0]);
                                                }}
                                                onMouseLeave={() => {
                                                    setHovered(undefined);
                                                }}
                                                sx={{
                                                    margin: 1
                                                }}
                                                key={`sW: ${i}`}
                                            >
                                                {w}
                                            </Typography>
                                        )
                                    })
                                }
                            </Container>

                            <Container>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Modifications:
                                </span>
                                {
                                    rigObject.mods.map((m: string, i: number) => {
                                        return (
                                            <Typography
                                                onMouseEnter={() => {
                                                    // find details of this Modification
                                                    const foundMod: Modification[] = rigModifications.concat(weaponModifications).filter((modi: Modification) => modi.name === stripParentheses(m));
                                                    setHovered(foundMod[0]);
                                                }}
                                                onMouseLeave={() => {
                                                    setHovered(undefined);
                                                }}
                                                sx={{
                                                    margin: 1
                                                }}
                                                key={`sm: ${i}`}
                                            >
                                                {m}
                                            </Typography>
                                        )
                                    })
                                }
                            </Container>

                        </Grid>
                        <Grid item xs={2}>
                            {
                                (rigObject.driverSpecial.length > 0) ?
                                    <>
                                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                            Driver special:
                                        </span>
                                        <br />
                                        {rigObject.driverSpecial}
                                        <br />
                                    </> : <></>
                            }
                            {
                                (rigObject.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                                    <>
                                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                            Gunner:
                                        </span>
                                        <br />
                                        {rigObject.gunnerSpecial}
                                    </> : <></>
                            }
                            {
                                (rigObject.mods.filter((mod: string) => mod === 'Mine Launcher').length === 1) ?
                                    <>
                                        <br />
                                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                            Mines:
                                        </span>
                                        <br />
                                        {rigObject.mines.map((mine: string, indx: number) => {
                                            return (
                                                <Typography key={`mine:${indx}`}>
                                                    {mine}
                                                </Typography>
                                            )
                                        })}
                                    </> : <></>
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                (rigObject.gunnerSpecial.includes('Familiar') && rigObject.mods.filter((mod: string) => mod === 'Gunner').length === 1) ?
                                    <>
                                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                            Familiar:
                                        </span>
                                        <Typography>
                                            Speed: <span style={{ color: "navy" }}>{rigObject.familiarStats.speed}</span> Armour: <span style={{ color: "navy" }}>{rigObject.familiarStats.armour}</span> Empty slots: <span style={{ color: "navy" }}>{rigObject.familiarStats.emptySlots}</span>
                                        </Typography>
                                        {
                                            rigObject.familiar?.map((fa: string, indx: number) => {
                                                return (
                                                    <Typography key={`faStuff ${indx}`}>
                                                        {fa}
                                                    </Typography>
                                                )
                                            })
                                        }
                                    </> : <></>
                            }
                            {
                                (rigObject.concealedWeapon.length > 0) ?
                                    <>
                                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                            Concealed weapon:
                                        </span>

                                        <br />

                                        {rigObject.concealedWeapon}

                                    </> : <></>
                            }
                            {
                                (rigObject.gunnerSpecial.includes('The right tool')) ?
                                    <>
                                        <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                            Right tools:
                                        </span>

                                        <br />

                                        {rigObject.rightTool.map((tool: string, indx: number) => {
                                            return (
                                                <Typography key={`tool:${indx}`}>
                                                    {tool}
                                                </Typography>
                                            )
                                        })}

                                    </> : <></>
                            }
                        </Grid>
                    </Grid>

                    {/* RULES SECTION */}

                    <div style={{ marginTop: "40px" }}>
                        <Typography sx={{
                            background: "black",
                            color: "orange",
                            padding: 1,
                            margin: 1
                        }}>
                            RULES SUMMARY
                        </Typography>

                        {/* WEAPONS */}
                        <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Weapons:</Typography>
                        {weaponRules.map((w: any, i: number) => {
                            console.log('maping: ', w);
                            return (
                                <Typography key={i} sx={{ ml: 2 }}>
                                    <strong>{`${w.name}: `}</strong>
                                    {`impact power:  ${w.impactPower}. `}
                                    {`range:  ${w.range}. `}
                                    {`specialities:  ${w.specialties}. `}
                                    {`Primed:  ${w.primed}. `}
                                </Typography>
                            )
                        })}

                        {/* MINES */}
                        {
                            rigObject.mods.includes("Mine Launcher") && rigObject.mines.length > 0 &&
                            <>
                                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Mines:</Typography>
                                {
                                    
                                    rigObject.mines.map((name: string, i: number) => {
                                        const mineData = mines
                                            .find((m: Mine) => m.name === stripParentheses(name));
                                        return (
                                            <Typography key={`rm${i}`} sx={{ marginLeft: 2 }}>
                                                {mineData?.name}
                                            </Typography>
                                        );
                                    })
                                }
                            </>
                        }

                        {/* MODIFICATIONS */}
                        <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Modifications:</Typography>
                        {
                            rigObject.mods.map((name: string, i: number) => {
                                const m = rigModifications.concat(weaponModifications)
                                    .find(m => m.name === stripParentheses(name));
                                if (!m) return null;
                                return (
                                    <Typography key={`rmod${i}`} sx={{ marginLeft: 2 }}>
                                        {m.name}: {m.effect}
                                    </Typography>
                                );
                            })
                        }

                        {/* DRIVER SPECIAL */}
                        {
                            rigObject.driverSpecial.length > 0 &&
                            <>
                                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Driver Special:</Typography>
                                <Typography sx={{ marginLeft: 2 }}>
                                    {rigObject.driverSpecial}
                                </Typography>
                            </>
                        }

                        {/* GUNNER SPECIAL */}
                        {
                            rigObject.mods.includes("Gunner") &&
                            <>
                                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Gunner Special:</Typography>
                                <Typography sx={{ marginLeft: 2 }}>
                                    {rigObject.gunnerSpecial}
                                </Typography>
                            </>
                        }

                        {/* FAMILIAR */}
                        {
                            rigObject.gunnerSpecial.includes("Familiar") &&
                            <>
                                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Familiar Traits:</Typography>
                                <Typography sx={{ marginLeft: 2 }}>
                                    Speed {rigObject.familiarStats.speed}, Armour {rigObject.familiarStats.armour}, Empty {rigObject.familiarStats.emptySlots}
                                </Typography>
                                {rigObject.familiar?.map((f: any, i: number) => (
                                    <Typography key={`rfam${i}`} sx={{ marginLeft: 2 }}>{f}</Typography>
                                ))}
                            </>
                        }

                        {/* CONCEALED */}
                        {
                            rigObject.concealedWeapon.length > 0 &&
                            <>
                                <Typography sx={{ marginTop: 2, fontWeight: "bold" }}>Concealed Weapon:</Typography>
                                <Typography sx={{ marginLeft: 2 }}>
                                    {rigObject.concealedWeapon}
                                </Typography>
                            </>
                        }

                    </div>

                </div>
            </Container>
        );
    } else {
        return (<></>);
    }
}

export default ShowPdf;