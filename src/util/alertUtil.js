// utils/deleteUtils.js
import Swal from "sweetalert2";

export const showDeleteAlert = async (onConfirm, onCancel) => {
  const newSwal = Swal.mixin({
    customClass: {
      confirmButton: "button button-success",
      cancelButton: "button button-error",
    },
    buttonsStyling: false,
  });

  try {
    const result = await newSwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      if (onConfirm) onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      if (onCancel) onCancel();
    }
  } catch (error) {
    console.error("Error showing delete alert:", error);
  }
};
export const showSuccessMessage = (operation) => {
  Swal.fire({
    icon: "success",
    title: `Successfully ${operation}!`,
    text: `The record has been ${operation.toLowerCase()} successfully.`,
    confirmButtonText: "OK",
  });
};

export const showCanceledMessage = (operation) => {
  Swal.fire("Cancelled", "Your record is safe.", "error");
};
