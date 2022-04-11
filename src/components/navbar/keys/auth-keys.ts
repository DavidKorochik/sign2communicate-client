export const handleAuthenticatedNavbarSelectedKeys = ():
  | string[]
  | undefined => {
  switch (window.location.pathname) {
    case '/':
      return ['1'];
    case '/signings':
      return ['2'];
    case '/create':
      return ['3'];
    default:
      return ['3'];
  }
};
