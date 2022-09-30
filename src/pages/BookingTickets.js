import React, { useState } from 'react';
import styled from 'styled-components';
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
import Seats from '../components/Seats';
import BookingInfo from '../components/BookingInfo';

const BookingTickets = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState(false);

  const { selectedSeats, selectedVipSeats } = useSelector((state) => state.seat);
  const dispatch = useDispatch();

  const steps = ['Chọn ghế', 'Chọn phương thức thanh toán', 'Hoàn thành'];

  const handleNext = () => {
    if (selectedSeats.length > 0 || selectedVipSeats.length > 0) {
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

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Seats data={data} />
          </>
        );
      case 1:
        return (
          <div id='payment-method'>
            <Button
              className='Button'
              style={{
                borderRadius: 35,
                color: 'var(--primary-white)',
                border: '2px solid',
                padding: '10px 36px',
                fontSize: '18px',
              }}
              disabled={!checked}
              variant='outlined'
              onClick={handleNext}
            >
              Thanh Toán Tại Quầy
            </Button>
            <Button
              className='Button'
              style={{
                borderRadius: 35,
                backgroundColor: 'var(--primary-yellow)',
                color: 'var(--primary-white)',
                padding: '10px 36px',
                fontSize: '18px',
              }}
              disabled={!checked}
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
                checked={checked}
                sx={{ color: 'var(--primary-white)' }}
                onChange={(e) => setChecked(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              Tôi đồng ý với tất cả các điều khoản về việc mua và sử dụng vé xem phim,
              đồng thời xác nhận sẽ không hủy hoặc thay đổi thông tin đối với vé đã thanh
              toán (khách hàng sẽ không được hoàn tiền trong trường hợp này).
            </Box>
          </div>
        );
      case 2:
        return (
          <Box
            sx={{
              mb: 5,
              p: 5,
              backgroundColor: 'var(--primary--transparent)',
              borderRadius: 'var(--primary--borderRadius)',
            }}
          >
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
  };

  return (
    <Wrapper>
      <Box className='steppers-box'>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
              <StepContent>
                <Typography component='span'>{getStepContent(index)}</Typography>
                <Box className='Button-box'>
                  <div>
                    {index !== 1 && (
                      <Button
                        style={{
                          backgroundColor: 'var(--primary-yellow)',
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 600px;
  padding: 1rem;
  .steppers-box {
    justify-self: center;
    //modify stepper label color
    .MuiStepLabel-label.Mui-active {
      color: var(--primary-white);
    }
    .MuiStepLabel-label.Mui-completed {
      color: var(--primary--gray);
    }
    .MuiStepLabel-labelContainer {
      color: var(--primary--gray);
    }
    .Button-box {
      justify-self: flex-end;
      margin-right: 2rem;
    }
    // main stepper collapse content
    .MuiCollapse-wrapperInner.MuiCollapse-vertical {
      width: 1000px;
      display: grid;
      place-items: center;
      text-align: center;
      padding: 0 3rem;
    }

    #payment-method {
      display: grid;
      place-items: center;
      svg {
        font-size: 30px;
        margin-right: 10px;
      }
      // change mui button disable style
      .Button:disabled {
        pointer-events: auto;
        cursor: not-allowed;
      }
    }
  }
`;

export default BookingTickets;
