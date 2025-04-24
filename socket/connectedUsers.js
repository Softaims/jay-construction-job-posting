export const connectedUsers = new Map();

export const addUserSocket = (userId, socketId) => {
  if (!connectedUsers.has(userId)) {
    connectedUsers.set(userId, new Set());
  }
  connectedUsers.get(userId).add(socketId);
};

export const removeUserSocket = (userId, socketId) => {
  if (connectedUsers.has(userId)) {
    connectedUsers.get(userId).delete(socketId);
    if (connectedUsers.get(userId).size === 0) {
      connectedUsers.delete(userId);
    }
  }
};
