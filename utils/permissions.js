// Discord-like permission bits (52 permissions)
const PermissionBits = {
  CREATE_INSTANT_INVITE: 1n << 0n,        // 0x00000001
  KICK_MEMBERS: 1n << 1n,                 // 0x00000002
  BAN_MEMBERS: 1n << 2n,                  // 0x00000004
  ADMINISTRATOR: 1n << 3n,                // 0x00000008
  MANAGE_CHANNELS: 1n << 4n,              // 0x00000010
  MANAGE_GUILD: 1n << 5n,                 // 0x00000020
  ADD_REACTIONS: 1n << 6n,                // 0x00000040
  VIEW_AUDIT_LOG: 1n << 7n,               // 0x00000080
  PRIORITY_SPEAKER: 1n << 8n,             // 0x00000100
  STREAM: 1n << 9n,                       // 0x00000200
  VIEW_CHANNEL: 1n << 10n,                // 0x00000400
  SEND_MESSAGES: 1n << 11n,               // 0x00000800
  SEND_TTS_MESSAGES: 1n << 12n,           // 0x00001000
  MANAGE_MESSAGES: 1n << 13n,             // 0x00002000
  EMBED_LINKS: 1n << 14n,                 // 0x00004000
  ATTACH_FILES: 1n << 15n,                // 0x00008000
  READ_MESSAGE_HISTORY: 1n << 16n,        // 0x00010000
  MENTION_EVERYONE: 1n << 17n,            // 0x00020000
  USE_EXTERNAL_EMOJIS: 1n << 18n,         // 0x00040000
  VIEW_GUILD_INSIGHTS: 1n << 19n,         // 0x00080000
  CONNECT: 1n << 20n,                     // 0x00100000
  SPEAK: 1n << 21n,                       // 0x00200000
  MUTE_MEMBERS: 1n << 22n,                // 0x00400000
  DEAFEN_MEMBERS: 1n << 23n,              // 0x00800000
  MOVE_MEMBERS: 1n << 24n,                // 0x01000000
  USE_VAD: 1n << 25n,                     // 0x02000000
  CHANGE_NICKNAME: 1n << 26n,             // 0x04000000
  MANAGE_NICKNAMES: 1n << 27n,            // 0x08000000
  MANAGE_ROLES: 1n << 28n,                // 0x10000000
  MANAGE_WEBHOOKS: 1n << 29n,             // 0x20000000
  MANAGE_EMOJIS_AND_STICKERS: 1n << 30n,  // 0x40000000
  USE_APPLICATION_COMMANDS: 1n << 31n,    // 0x80000000
  REQUEST_TO_SPEAK: 1n << 32n,            // 0x100000000
  MANAGE_EVENTS: 1n << 33n,               // 0x200000000
  MANAGE_THREADS: 1n << 34n,              // 0x400000000
  CREATE_PUBLIC_THREADS: 1n << 35n,       // 0x800000000
  CREATE_PRIVATE_THREADS: 1n << 36n,      // 0x1000000000
  USE_EXTERNAL_STICKERS: 1n << 37n,       // 0x2000000000
  SEND_MESSAGES_IN_THREADS: 1n << 38n,    // 0x4000000000
  USE_EMBEDDED_ACTIVITIES: 1n << 39n,     // 0x8000000000
  MODERATE_MEMBERS: 1n << 40n,            // 0x10000000000
  VIEW_CREATOR_MONETIZATION_ANALYTICS: 1n << 41n, // 0x20000000000
  USE_SOUNDBOARD: 1n << 42n,              // 0x40000000000
  CREATE_GUILD_EXPRESSIONS: 1n << 43n,    // 0x80000000000
  CREATE_EVENTS: 1n << 44n,               // 0x100000000000
  USE_EXTERNAL_SOUNDS: 1n << 45n,         // 0x200000000000
  SEND_VOICE_MESSAGES: 1n << 46n,         // 0x400000000000
  SEND_POLLS: 1n << 49n,                  // 0x2000000000000
  USE_EXTERNAL_APPS: 1n << 50n            // 0x4000000000000
};

// Permission names for UI and validation
const PermissionNames = {
  'CREATE_INSTANT_INVITE': 'Create Invite',
  'KICK_MEMBERS': 'Kick Members',
  'BAN_MEMBERS': 'Ban Members',
  'ADMINISTRATOR': 'Administrator',
  'MANAGE_CHANNELS': 'Manage Channels',
  'MANAGE_GUILD': 'Manage Server',
  'ADD_REACTIONS': 'Add Reactions',
  'VIEW_AUDIT_LOG': 'View Audit Log',
  'PRIORITY_SPEAKER': 'Priority Speaker',
  'STREAM': 'Video',
  'VIEW_CHANNEL': 'View Channel',
  'SEND_MESSAGES': 'Send Messages',
  'SEND_TTS_MESSAGES': 'Send TTS Messages',
  'MANAGE_MESSAGES': 'Manage Messages',
  'EMBED_LINKS': 'Embed Links',
  'ATTACH_FILES': 'Attach Files',
  'READ_MESSAGE_HISTORY': 'Read Message History',
  'MENTION_EVERYONE': 'Mention Everyone',
  'USE_EXTERNAL_EMOJIS': 'Use External Emojis',
  'VIEW_GUILD_INSIGHTS': 'View Server Insights',
  'CONNECT': 'Connect',
  'SPEAK': 'Speak',
  'MUTE_MEMBERS': 'Mute Members',
  'DEAFEN_MEMBERS': 'Deafen Members',
  'MOVE_MEMBERS': 'Move Members',
  'USE_VAD': 'Use Voice Activity',
  'CHANGE_NICKNAME': 'Change Nickname',
  'MANAGE_NICKNAMES': 'Manage Nicknames',
  'MANAGE_ROLES': 'Manage Roles',
  'MANAGE_WEBHOOKS': 'Manage Webhooks',
  'MANAGE_EMOJIS_AND_STICKERS': 'Manage Emojis & Stickers',
  'USE_APPLICATION_COMMANDS': 'Use Application Commands',
  'REQUEST_TO_SPEAK': 'Request to Speak',
  'MANAGE_EVENTS': 'Manage Events',
  'MANAGE_THREADS': 'Manage Threads',
  'CREATE_PUBLIC_THREADS': 'Create Public Threads',
  'CREATE_PRIVATE_THREADS': 'Create Private Threads',
  'USE_EXTERNAL_STICKERS': 'Use External Stickers',
  'SEND_MESSAGES_IN_THREADS': 'Send Messages in Threads',
  'USE_EMBEDDED_ACTIVITIES': 'Use Embedded Activities',
  'MODERATE_MEMBERS': 'Moderate Members',
  'VIEW_CREATOR_MONETIZATION_ANALYTICS': 'View Creator Monetization Analytics',
  'USE_SOUNDBOARD': 'Use Soundboard',
  'CREATE_GUILD_EXPRESSIONS': 'Create Server Expressions',
  'CREATE_EVENTS': 'Create Events',
  'USE_EXTERNAL_SOUNDS': 'Use External Sounds',
  'SEND_VOICE_MESSAGES': 'Send Voice Messages',
  'SEND_POLLS': 'Send Polls',
  'USE_EXTERNAL_APPS': 'Use External Apps'
};

// Function to check if a permission bit is included in a permission value
function hasPermission(permissionValue, permissionBit) {
  const permissions = BigInt(permissionValue);
  const bit = BigInt(permissionBit);
  return (permissions & bit) === bit;
}

// Function to add a permission bit to a permission value
function addPermission(permissionValue, permissionBit) {
  const permissions = BigInt(permissionValue);
  const bit = BigInt(permissionBit);
  return permissions | bit;
}

// Function to remove a permission bit from a permission value
function removePermission(permissionValue, permissionBit) {
  const permissions = BigInt(permissionValue);
  const bit = BigInt(permissionBit);
  return permissions & ~bit;
}

// Function to get all permissions as an array
function getAllPermissions() {
  const permissions = [];
  for (const [key, value] of Object.entries(PermissionBits)) {
    permissions.push({
      key,
      value: value.toString(),
      name: PermissionNames[key] || key
    });
  }
  return permissions;
}

// Function to get default permissions for @everyone role
function getDefaultEveryonePermissions() {
  // Default permissions for @everyone role (view channels, send messages, etc.)
  let permissions = 0n;
  permissions |= PermissionBits.VIEW_CHANNEL;
  permissions |= PermissionBits.SEND_MESSAGES;
  permissions |= PermissionBits.SEND_TTS_MESSAGES;
  permissions |= PermissionBits.MANAGE_MESSAGES;
  permissions |= PermissionBits.EMBED_LINKS;
  permissions |= PermissionBits.ATTACH_FILES;
  permissions |= PermissionBits.READ_MESSAGE_HISTORY;
  permissions |= PermissionBits.MENTION_EVERYONE;
  permissions |= PermissionBits.USE_EXTERNAL_EMOJIS;
  permissions |= PermissionBits.ADD_REACTIONS;
  permissions |= PermissionBits.CONNECT;
  permissions |= PermissionBits.SPEAK;
  permissions |= PermissionBits.USE_VAD;
  permissions |= PermissionBits.PRIORITY_SPEAKER;
  permissions |= PermissionBits.STREAM;
  permissions |= PermissionBits.CREATE_INSTANT_INVITE;

  return permissions.toString();
}

module.exports = {
  PermissionBits,
  PermissionNames,
  hasPermission,
  addPermission,
  removePermission,
  getAllPermissions,
  getDefaultEveryonePermissions
};