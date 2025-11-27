const { zokou } = require("../framework/zokou");

// Store anti-sticker state per group (better for multi-group support)
const antistiker = new Map();

zokou({
  nomCom: "antisticker",
  categorie: "Group",
  reaction: "🚫",
  fromMe: true, // Only works when used by admin/owner
  desc: "Delete any sticker in groups"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms, auteurMessage } = commandeOptions;
  const groupId = dest;

  try {
    // Command toggle functionality
    if (arg.length > 0) {
      const action = arg[0].toLowerCase();
      
      if (action === "on") {
        antisticker.set(groupId, true);
        return repondre("🚫 *Anti-sticker protection activated* 🚯");
      } 
      else if (action === "off") {
        antisticker.set(groupId, false);
        return repondre("❌ *Anti-sticker protection deactivated*");
      }
      else if (action === "sticker") {
        const sticker = antisticker.get(groupId) ? "ACTIVE ✅" : "INACTIVE 🚫";
        return repondre(`🛡️ Anti-sticker: ${sticker}`);
      }
    }

    // Show help if no arguments
    return repondre(
      `🛡️ *Anti-sticker Commands:*\n` +
      `• *${s.PREFIXE}antisticker on* - Enable protection\n` +
      `• *${s.PREFIXE}antisticker off* - Disable protection\n` +
      `• *${s.PREFIXE}antisticker * - Check current sticker`
    );

  } catch (error) {
    console.error("Anti-sticker Command Error:", error);
    repondre("❌ An error occurred while processing the command");
  }
});

// Message handler for detecting stickers
module.exports.antistickerHandler = async (message, zk) => {
  try {
    const groupId = message.key.remoteJid;
    if (!groupId || !antisticker.get(groupId)) return;

    // Check for mentions
    if (message?.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
      const mentionedJids = message.message.extendedTextMessage.contextInfo.mentionedJid;
      const ownerJid = s.OWNER_NUMBER + "@s.whatsapp.net"; // Use from config

      if (mentionedJids.includes(ownerJid)) {
        await zk.sendMessage(groupId, { 
          text: `**\n@${message.key.participant.split('@')[0]}`,
          mentions: [message.key.participant]
        });

        // Optional: Add warning level system
        const warnings = warningDB.get(message.key.participant) || 0;
        warningDB.set(message.key.participant, warnings + 1);
        
        if (warnings >= 3) {
          await zk.groupParticipantsUpdate(
            groupId,
            [message.key.participant],
            "remove"
          );
        }
      }
    }
  } catch (error) {
    console.error("Anti-sticker Handler Error:", error);
  }
};
