describe('Jest', function () {
  beforeEach(function () {
    fetch.resetMocks();
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  it('should understand .toBe', function () {
    const underTest = (a, b) => a + b;

    const result = underTest(123, 45);

    expect(result).toBe(168)
  });
  it('should understand .not', function () {
    const underTest = (a, b) => a + b;

    const result = underTest(0.1, 0.2);

    expect(result).not.toBe(0.3)
  });
  it('should understand the difference between identity and equality', function () {
    const underTest = (name) => ({ name: name });

    const result = underTest('First');

    expect(result.name).toBe('First');
    expect(result).not.toBe({name: 'First'});
    expect(result).toEqual({name: 'First'});
  });

  it('should understand stubs', function () {
    const underTest = function pickRandom(xs) {
      return xs[Math.floor(Math.random() * xs.length)];
    }
    jest.spyOn(Math, 'random').mockImplementation(() => 0);
    expect(underTest(['First', 'Second', 'Third'])).toBe('First');
    jest.spyOn(Math, 'random').mockImplementation(() => 0.33);
    expect(underTest(['First', 'Second', 'Third'])).toBe('First');
    jest.spyOn(Math, 'random').mockImplementation(() => 0.34);
    expect(underTest(['First', 'Second', 'Third'])).toBe('Second');
    jest.spyOn(Math, 'random').mockImplementation(() => 0.66);
    expect(underTest(['First', 'Second', 'Third'])).toBe('Second');
    jest.spyOn(Math, 'random').mockImplementation(() => 0.67);
    expect(underTest(['First', 'Second', 'Third'])).toBe('Third');
    jest.spyOn(Math, 'random').mockImplementation(() => 0.99);
    expect(underTest(['First', 'Second', 'Third'])).toBe('Third');
  });

  // it('should understand why this does not fail', function () {
  //   setTimeout(function () {
  //     expect(1).toBe(2);
  //   }, 100);
  // });
  // it('should understand async tests - done', function (done) {
  //   setTimeout(function () {
  //     expect(2).toBe(3);
  //     done();
  //   }, 100);
  // });
  it('should understand async tests - promises', function () {
    const underTest = (name) => new Promise(resolve => setTimeout(() => resolve(`Hello ${name}!`), 100));

    return underTest('World').then(result => expect(result).toBe('Hello World!'));
  });
  it('should understand async tests - promises', function () {
    const underTest = (name) => new Promise(resolve => setTimeout(() => resolve(`Hello ${name}!`), 100));

    return underTest('World').then(result => expect(result).toBe('Hello World!'));
  });

  it('should understand mocking http', () => {
    const fetchIp = () => fetch('/api/ipify?format=json')
      .then((response) => response.json())
      .then(({ ip }) => ip);
    fetch.mockResponseOnce(JSON.stringify({ ip: '1.2.3.4' }));

    return fetchIp().then((ip) => {
      expect(ip).toBe('1.2.3.4');
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.calls[0][0]).toBe('/api/ipify?format=json');
    });
  });
});
