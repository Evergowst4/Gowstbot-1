const PERMISSION_LEVELS = {
  EVERYONE: 100,
  TURBO: 250,
  BOT: 420,
  MOD: 500,
  GLOBAL_MOD: 750,
  BROADCASTER: 1000,
  SUPER_MOD: 1500,
  DEV: 2000
};

function checkPermission(commandPermission) {
  return (userPermission) => {
    return userPermission >= commandPermission;
  };
}

module.exports = {
  PERMISSION_LEVELS,
  checkPermission
};