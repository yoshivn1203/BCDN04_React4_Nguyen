import React from 'react';

import Cinema from './components/Cinema';
import BookingSumary from './components/BookingSumary';

export default function App() {
  return (
    <div className='section-center cinema-container'>
      <Cinema />
      <BookingSumary />
    </div>
  );
}
