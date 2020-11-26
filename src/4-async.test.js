import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import MyIp from './4-async';

beforeEach(fetch.resetMocks);
afterEach(cleanup);

it('should fetch and display your outbound IP address', async () => {
  fetch.mockResponseOnce(JSON.stringify({ ip: '1.2.3.4' }));
  const { container, getByText } = render(<MyIp />);
  expect(container.querySelector('div').textContent).toBe('');
  await waitFor(() => {});
  expect(getByText('1.2.3.4').textContent).toBe('1.2.3.4');
});
