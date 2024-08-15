import { Button, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { RigContext } from '../../context/RigContext';

export interface BookImage {
    url: string;
    description: string;
};

export interface Paragraph {
    image?: BookImage;
    subTitle?: string;
    strings: string;
};

export interface BookType {
    title: string;
    paragraphs: Paragraph[];
};

interface BookProps {
    book: BookType;
}

const Book: React.FC<BookType> = (props: BookType): React.ReactElement => {
    const {
        setMode
    } = useContext(RigContext);

    return (
        <Container>
            <Button
                onClick={() => { setMode('main'); }}>
                back to main page
            </Button>
            <Container sx={{
                color: 'rgb(180,180,180)'
            }}>
                <Typography variant="h4">
                    {props.title}
                </Typography>
                {
                    props.paragraphs.map((p: Paragraph, i: number) => {
                        return (
                            <Container key={`book para: ${i}`}>
                                { /** image here */
                                    p.image ?
                                    <></> :
                                    <></>
                                }
                                {
                                    p.subTitle ?
                                    <Typography 
                                        variant="h5"
                                        sx={{margin: 2}}
                                    >
                                        {p.subTitle}
                                    </Typography> :
                                    <></>
                                }
                                <Typography>
                                    {p.strings}
                                </Typography>
                            </Container>
                        )
                    })
                }
            </Container>
        </Container>
    );
}

export default Book;