import React, { useState } from 'react';
import { Container } from '@mui/material';

const DicePool: React.FC = () => {
    const [inputValue, setInputValue] = useState<number>(0);
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
    const [total, setTotal] = useState<number>(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(Number(e.target.value));
    };

    const generateRandomNumbers = () => {
        const numbers = Array.from({ length: inputValue }, () => Math.floor(Math.random() * 4 + 1));
        setRandomNumbers(numbers);
        setTotal(numbers.reduce((acc, num) => acc + num, 0));
    };

    return (
        <Container sx={{ marginTop: 1 }}>
            <div style={{ fontSize: 10 }}>
                Throw dices (how many?):
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={generateRandomNumbers}>
                    throw dices
                </button >
            </div>
            <div>
                {randomNumbers.map((number, index) => (
                    <span key={index} style={{
                        background: "darkRed", 
                        color: "white",
                        borderRadius: 2,
                        width: 25,
                        margin: 1}}>
                        {number}
                    </span>
                ))}
                = {total}
            </div>
        </Container>
    );
};

export default DicePool;
