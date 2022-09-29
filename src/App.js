import React, { useState } from 'react';

import Seats from './components/Seats';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import data from './data/data.json';
import BookingInfo from './components/BookingInfo';

export default function App() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Chọn ghế', 'Chọn phương thức thanh toán', 'Hoàn thành'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <Seats data={data} />
          </>
        );
      case 1:
        return (
          <p>
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.<br></br>
            Hãy kiểm tra email để biết kết quả giao dịch.<br></br>
            Chúc bạn có một buổi xem phim vui vẻ , hẹn gặp các bạn tại rạp.<br></br>
            Bạn muốn kiểm tra lịch sử giao dịch hãy nhấn nút bên dưới.
          </p>
        );
      case 2:
        return (
          <>
            <p>
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.<br></br>
              Hãy kiểm tra email để biết kết quả giao dịch.<br></br>
              Chúc bạn có một buổi xem phim vui vẻ , hẹn gặp các bạn tại rạp.<br></br>
              Bạn muốn kiểm tra lịch sử giao dịch hãy nhấn nút bên dưới.
            </p>
          </>
        );
      default:
        return 'Unknown step';
    }
  }

  return (
    <div className='section-center cinema-container'>
      <Box>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel style={{ color: 'blue' }}>{step}</StepLabel>
              <StepContent>
                <Typography component='span'>{getStepContent(index)}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      style={{
                        backgroundColor: '#f6aa00',
                      }}
                      variant='contained'
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Tiếp Tục'}
                    </Button>
                    {index === 0 && (
                      <Button
                        variant='contained'
                        onClick={() => console.log('reset')}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Chọn Lại Từ Đầu
                      </Button>
                    )}
                    {index > 0 && (
                      <Button
                        variant='contained'
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
      <BookingInfo data={data} />
    </div>
  );
}
