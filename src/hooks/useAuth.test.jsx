import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuth } from './useAuth';
import { AuthContext } from '../context/AuthContext';

describe('useAuth', () => {
  const mockAuthValue = {
    token: 'test-token',
    user: { id: 1, email: 'test@example.com', lastName: 'Test' },
    isAuthenticated: true,
    login: () => {},
    logout: () => {},
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('devrait retourner le contexte d\'authentification', () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuthValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toEqual(mockAuthValue);
  });

  it('devrait retourner le token depuis le contexte', () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuthValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.token).toBe('test-token');
  });

  it('devrait retourner l\'utilisateur depuis le contexte', () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuthValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual({
      id: 1,
      email: 'test@example.com',
      lastName: 'Test',
    });
  });

  it('devrait retourner isAuthenticated comme true si l\'utilisateur est connecté', () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuthValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it('devrait retourner isAuthenticated comme false si l\'utilisateur n\'est pas connecté', () => {
    const notAuthenticatedValue = {
      token: null,
      user: null,
      isAuthenticated: false,
      login: () => {},
      logout: () => {},
    };

    const wrapper = ({ children }) => (
      <AuthContext.Provider value={notAuthenticatedValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.token).toBeNull();
    expect(result.current.user).toBeNull();
  });

  it('devrait retourner les fonctions login et logout', () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuthValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });

  it('devrait retourner null si utilisé en dehors d\'un AuthProvider', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current).toBeNull();
  });
});

