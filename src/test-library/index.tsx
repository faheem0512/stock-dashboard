import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import React from 'react';

export * from '@testing-library/react';

const Router = ({ children }: { children: JSX.Element }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export const renderWithRouter = (ui: any, options?: any) => {
  return render(ui, { wrapper: Router, ...options });
};
