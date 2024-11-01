export const roles = {
    ADMIN: 'admin',
    MEMBER: 'member',
    GUEST: 'guest',
    STAFF: 'staff',
    REFEREE: 'referee',
  };
  
  export const checkPermission = (userRole, allowedRoles) => {
    return allowedRoles.includes(userRole);
  };