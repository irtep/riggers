import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { BookType, Paragraph } from './Book';
import { RigContext } from '../../context/RigContext';

const emptyParagraph: Paragraph = {
    subTitle: '',
    locationStr: '',
    strings: ''
};

const BookEditor: React.FC = () => {
    const [book, setBook] = useState<BookType>({
        title: '',
        paragraphs: []
    });

    const {
        setMode,
    } = useContext(RigContext);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook(prev => ({ ...prev, title: e.target.value }));
    };

    const handleParagraphChange = (index: number, field: keyof Paragraph, value: string) => {
        const updatedParagraphs = [...book.paragraphs];
        updatedParagraphs[index] = {
            ...updatedParagraphs[index],
            [field]: value
        };
        setBook(prev => ({ ...prev, paragraphs: updatedParagraphs }));
    };

    const addParagraph = () => {
        setBook(prev => ({ ...prev, paragraphs: [...prev.paragraphs, { ...emptyParagraph }] }));
    };

    const handleExport = async () => {
        const exportFormat = {
            title: book.title,
            paragraphs: book.paragraphs.map(p => ({
                subTitle: p.subTitle,
                ...(p.locationStr ? { locationStr: p.locationStr } : {}),
                strings: `\n${p.strings.trim()}\n`
            }))
        };

        const jsonString = JSON.stringify(exportFormat, null, 4);

        // Copy to clipboard
        try {   
            await navigator.clipboard.writeText(jsonString);
            console.log(jsonString);    
            alert('Book JSON exported to console and copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            alert('Book exported to console, but clipboard copy failed.');
        }
    };

    return (
        <Box sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            background: 'white'
        }}>
            <Button
                onClick={() => { setMode('lore'); }}>
                back
            </Button>
            <Typography variant="h5">Book Editor</Typography>
            <TextField
                label="Book Title"
                variant="outlined"
                fullWidth
                value={book.title}
                onChange={handleTitleChange}
            />

            <Divider />

            {book.paragraphs.map((para, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Paragraph {index + 1}</Typography>
                    <TextField
                        label="Subtitle"
                        variant="outlined"
                        value={para.subTitle}
                        onChange={(e) => handleParagraphChange(index, 'subTitle', e.target.value)}
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        value={para.locationStr}
                        onChange={(e) => handleParagraphChange(index, 'locationStr', e.target.value)}
                    />
                    <TextField
                        label="Text Content"
                        variant="outlined"
                        multiline
                        minRows={5}
                        value={para.strings}
                        onChange={(e) => handleParagraphChange(index, 'strings', e.target.value)}
                    />
                    <Divider />
                </Box>
            ))}

            <Button variant="contained" onClick={addParagraph}>
                Add Paragraph
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleExport}>
                Export Book
            </Button>
        </Box>
    );
};

export default BookEditor;
