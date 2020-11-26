beforeEach(fetch.resetMocks);

const fetchIp = () =>
  fetch('/api/ipify?format=json')
    .then((response) => response.json())
    .then(({ ip }) => ip);

it('should make the HTTP request and extract the IP address from it', () => {
  fetch.mockResponseOnce(JSON.stringify({ ip: '1.2.3.4' }));

  fetchIp().then((ip) => expect(ip).toBe('1.2.3.4'));

  expect(fetch.mock.calls.length).toBe(1);
  expect(fetch.mock.calls[0][0]).toBe('/api/ipify?format=json');
});
