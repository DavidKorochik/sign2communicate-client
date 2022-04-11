export const handleNotAuthenticatedNavbarSelectedKeys = ():
  | string[]
  | undefined => {
  switch (window.location.pathname) {
    case '/':
      return ['1'];
    case '/login':
      return ['2'];
    case '/signup':
      return ['3'];
    default:
      return ['2'];
  }
};
