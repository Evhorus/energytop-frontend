import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export type NotificationIcon = "success" | "error" | "warning" | "info";

const MySwal = withReactContent(Swal);

interface NotificationOptions {
    title: string;
    text: string;
    icon: NotificationIcon;
    showConfirmButton?: boolean;
    confirmButtonText?: string;
    confirmButtonColor?: string;
    cancelButtonText?: string;
    cancelButtonColor?: string;
    showCancelButton?: boolean;
    timer?: number;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
}

export const showNotification = ({
    title,
    text,
    icon,
    showConfirmButton = true,
    confirmButtonText = "Confirmar",
    confirmButtonColor,
    cancelButtonText = "Cancelar",
    cancelButtonColor,
    showCancelButton = false,
    timer,
    onConfirm,
    onCancel,
    onClose,
}: NotificationOptions) => {
    MySwal.fire({
        title,
        text,
        icon,
        showConfirmButton,
        confirmButtonText,
        confirmButtonColor,
        cancelButtonText,
        cancelButtonColor,
        showCancelButton,
        timer,
    }).then((result) => {
        result.isConfirmed && onConfirm?.();
        result.dismiss === Swal.DismissReason.cancel && onCancel?.();
        result.dismiss && result.dismiss !== Swal.DismissReason.cancel && onClose?.();
    });
};
