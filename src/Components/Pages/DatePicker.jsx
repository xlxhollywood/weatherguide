import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ maxWidth: '300px', mx: 'auto', padding: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>날짜 선택</Typography>
                <DesktopDatePicker
                    label="날짜를 선택하세요"
                    inputFormat="yyyy/MM/dd"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Typography variant="h6">  이 날은 비 올 확률 60% !</Typography>
            </Box>
        </LocalizationProvider>
    );
};

export default DatePicker;
