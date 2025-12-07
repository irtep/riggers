import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { RigContext } from '../context/RigContext';
import { Weapon, weapons } from '../data/weapons';
import { Modification, rigModifications, weaponModifications } from '../data/modifications';
import { Chassis, chassises } from '../data/chassises';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Mine, mines } from '../data/mines';
import RulesForPdf from './RulesForPdf';

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

    const countStrings = (arr: string[]) => {
        const map = new Map<string, number>();
        for (const a of arr) {
            map.set(a, (map.get(a) || 0) + 1);
        }
        return Array.from(map, ([name, count]) => ({ name, count }));
    };

    const weaponCounts = countStrings(rigObject.selectedWeapons);
    const modCounts = countStrings(rigObject.mods);

    useEffect(() => {
        if (rigObject.chassis !== matchingChassis.name) {
            const matchedChassis = chassises.find(chassis => chassis.name === rigObject.chassis);

            if (matchedChassis) {
                setMatchingChassis(matchedChassis);
            }

        }
        console.log('rig: ', rigObject);
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
                                {weaponCounts.map((w: any, i: number) => (
                                    <Typography
                                        onMouseEnter={() => {
                                            const foundWeapon = weapons.find(wep => wep.name === stripParentheses(w.name));
                                            setHovered(foundWeapon);
                                        }}
                                        onMouseLeave={() => {
                                            setHovered(undefined);
                                        }}
                                        sx={{ margin: 1 }}
                                        key={`sW:${i}`}
                                    >
                                        {w.count > 1 ? `${w.name}  (${w.count}x)` : w.name}
                                    </Typography>
                                ))}

                            </Container>

                            <Container>
                                <span style={{ background: "orange", color: "black", fontWeight: "strong", padding: 1 }}>
                                    Modifications:
                                </span>
                                {modCounts.map((m, i) => (
                                    <Typography
                                        onMouseEnter={() => {
                                            const foundMod = rigModifications.concat(weaponModifications)
                                                .find(modi => modi.name === stripParentheses(m.name));
                                            setHovered(foundMod);
                                        }}
                                        onMouseLeave={() => setHovered(undefined)}
                                        sx={{ margin: 1 }}
                                        key={`sm:${i}`}
                                    >
                                        {m.count > 1 ? `${m.name}  (${m.count}x)` : m.name}
                                    </Typography>
                                ))}

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

                                        <br/>

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

                    <RulesForPdf />

                </div>
            </Container>
        );
    } else {
        return (<></>);
    }
}

export default ShowPdf;