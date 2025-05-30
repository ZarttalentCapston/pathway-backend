import User from './User';
import Role from './Role';

// User <> Role
User.belongsTo(Role, { foreignKey: 'targetRoleId', as: 'targetRole' });

export { User, Role };
