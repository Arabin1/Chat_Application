import { unlink } from 'fs';
import { msgAttachmentFolder, upFolder } from '../../constants/util.constant.js';

// eslint-disable-next-line import/prefer-default-export
export const deleteMessageAttachments = (messages) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const message of messages) {
    message.attachments.forEach((image) => {
      unlink(`${upFolder}${msgAttachmentFolder}${image}`, (err) => {
        console.log(err);
      });
    });
  }
};
