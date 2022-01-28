import { toast, Flip } from "react-toastify"; // Notification message container

const curMsgs = {};
export const showNotification = (message, type, timeOut) => {
  if (curMsgs[message]) {
    toast.update(curMsgs[message], {
      type,
      autoClose: timeOut,
      onClose: () => {
        delete curMsgs[message];
      },
    });
    return curMsgs[message];
  }
  curMsgs[message] = toast(`${message}`, {
    type, // allowed types ["info","success","warning","error","default"]
    autoClose: timeOut,
    transition: Flip,
    onClose: () => {
      delete curMsgs[message];
    },
  });
  return curMsgs[message];
};
