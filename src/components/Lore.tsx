import { Button, Container, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { RigContext } from '../context/RigContext';
import { books } from '../data/books';
import { BookType } from './bookComponents/Book';
import Book from './bookComponents/Book';

const Lore: React.FC = (): React.ReactElement => {
    const [selectedBook, setSelectedBook] = useState<BookType | ''>('');
    const {
        setMode
    } = useContext(RigContext);

    return (
        <Container>
            <Button
                onClick={() => { setMode('main'); }}>
                back to main page
            </Button>
            <Button
                onClick={() => { setSelectedBook(''); }}>
                back to lore menu
            </Button>
            <Container sx={{
                color: 'rgb(180,180,180)'
            }}>
                <Typography
                    variant="h4"
                    sx={{ margin: 2 }}
                >
                    Books:
                </Typography>
                <Typography>
                    {
                        (selectedBook === '') ?
                            <>
                                {
                                    books.map((book: BookType, i: number) => {
                                        return (
                                            <Container
                                                key={`book title ${i}`}
                                                onClick={() => {
                                                    setSelectedBook(book);
                                                }}
                                            >
                                                {book.title}
                                            </Container>
                                        )
                                    })
                                }
                            </> :
                            <>
                            {
                                <Book
                                    {...selectedBook}
                                />
                            }
                            </>
                    }
                </Typography>
            </Container>
        </Container>
    );
}

export default Lore;