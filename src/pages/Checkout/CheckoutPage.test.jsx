import { it, expect, describe, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react';

import { data, MemoryRouter } from 'react-router';
import axios from 'axios';
import { CheckoutPage } from './CheckoutPage'
vi.mock('axios')

describe('checkou page', () => {
  let loadCart;
  let cart;

  beforeEach(() => {
    cart = [
    { id: '1', quantity: 7 }
  ];
    loadCart = vi.fn();
   axios.get.mockImplementation((urlPath) => {
  if (urlPath === '/api/delivery-options?expand=estimatedDeliveryTime') {
    return {
      data: [{
        id: '1',
        deliveryDays: 7,
        priceCents: 0
      }]
    }
  }

  if (urlPath === '/api/payment-summary') {
    return {
      data: {
        totalItems: 1,
        totalPriceCents: 1090
      }
    }
  }
});

  })
  it('display cart summary', () => {
    render(
      <MemoryRouter>
        <CheckoutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>
    )

    expect(screen.getByText(/7 items/i)).toBeInTheDocument();


  })
})