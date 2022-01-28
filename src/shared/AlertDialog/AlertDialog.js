import { confirmAlert } from "react-confirm-alert";

import { showNotification } from "../../helper/Notifications";

export const AlertDialog = (props) => {
  return confirmAlert({
    title: props.title,
    message: props.message,
    buttons: [
      {
        label: props.button1,
        onClick: async () => {
          try {
            const res = await props.method(props.id).unwrap();
            if (res.status === 200) {
              showNotification(res.message, "success");
            }
          } catch (err) {
            showNotification(err.error, "error");
          }
        },
      },
      {
        label: props.button2,
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    disableBackdropClick: true,
    willUnmount: () => {},
  });
};
