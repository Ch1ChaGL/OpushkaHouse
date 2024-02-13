import { QueryClient, QueryClientProvider, keepPreviousData } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { persistor, store } from '../store/inedx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      placeholderData: keepPreviousData,
    },
  },
});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default AppProvider;
