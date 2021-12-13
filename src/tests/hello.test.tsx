// # use describe, it pattern
import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe("<App />", () => {
    it("Renders <App /> component correctly", () => {
    //   const { getByText } = render(<App />);
      let sum = 1 + 2
      expect(sum).toEqual(3);
      // expect(getByText(/Getting started with React testing library/i)).toBeInTheDocument();
    });
  });
  