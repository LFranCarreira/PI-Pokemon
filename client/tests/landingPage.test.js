/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../src/components/LandingPage/Landing';

describe('Landing Page', () => {
  test('should show the landing page', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Let's go!")).toBeDefined();
  });
});
