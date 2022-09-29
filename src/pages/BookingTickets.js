import React, { useState } from 'react';
import Seats from '../components/Seats';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import { BsPaypal } from 'react-icons/bs';

import { useSelector, useDispatch } from 'react-redux';
import { seatActions } from '../store/seatSelect';
import data from '../data/data.json';
import BookingInfo from '../components/BookingInfo';

const BookingTickets = () => {
  const [activeStep, setActiveStep] = useState(0);

  const { selectedSeats } = useSelector((state) => state.seat);
  const dispatch = useDispatch();

  const steps = ['Chọn ghế', 'Chọn phương thức thanh toán', 'Hoàn thành'];

  const handleNext = () => {
    if (selectedSeats.length > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Bạn chưa chọn ghế nào',
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    dispatch(seatActions.reset());
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
          <div className='payment-method'>
            <Button
              style={{
                borderRadius: 35,
                color: '#f1f1f1',
                border: '2px solid',
                padding: '10px 36px',
                fontSize: '18px',
              }}
              variant='outlined'
              onClick={handleNext}
            >
              Thanh Toán Tại Quầy
            </Button>
            <Button
              style={{
                borderRadius: 35,
                backgroundColor: '#f6aa00',
                color: '#f1f1f1',
                padding: '10px 36px',
                fontSize: '18px',
              }}
              variant='contained'
              sx={{ mt: 4, mb: 5 }}
              onClick={() =>
                Swal.fire({
                  icon: 'warning',
                  title: 'Tính năng này đang được cập nhật',
                })
              }
            >
              <BsPaypal />
              Thanh Toán Qua Paypal
            </Button>
            <Box sx={{ mb: 5 }}>
              <Checkbox
                color='primary'
                checked
                inputProps={{ 'aria-label': 'disabled checked checkbox' }}
              />
              Hiện nay chúng tôi chưa hỗ trợ dịch vụ hùy hoặc thay đổi thông tin vé đã
              thanh toán. Quý khách vui lòng kiểm tra kỹ thông tin trước khi xác nhận
              thanh toán.
            </Box>
          </div>
        );
      case 2:
        return (
          <Box sx={{ mb: 5 }}>
            <p>
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.<br></br>
              Thông tin vé đã được gửi đến email của bạn<br></br>
              Chúc bạn có một buổi xem phim vui vẻ , hẹn gặp các bạn tại rạp.<br></br>
            </p>
          </Box>
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
                <Box>
                  <div>
                    {index !== 1 && (
                      <Button
                        style={{
                          backgroundColor: '#f6aa00',
                        }}
                        variant='contained'
                        onClick={index === steps.length - 1 ? handleReset : handleNext}
                        sx={{ mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Hoàn Thành' : 'Tiếp Tục'}
                      </Button>
                    )}

                    {index === 0 && (
                      <Button
                        variant='contained'
                        onClick={() => dispatch(seatActions.reset())}
                        sx={{ mr: 3 }}
                      >
                        Chọn Lại Từ Đầu
                      </Button>
                    )}
                    {index === 1 && (
                      <Button variant='contained' onClick={handleBack} sx={{ mr: 1 }}>
                        &larr; trở về
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      <BookingInfo data={data} />
    </div>
  );
};

export default BookingTickets;
