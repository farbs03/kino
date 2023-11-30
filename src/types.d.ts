enum ToastType {
	success = "success",
	error = "error",
	warning = "warning",
	info = "info",
}

enum ToastLocation {
	topLeft = "top-right",
	topCenter = "top-center",
	topRight = "top-left",
	bottomLeft = "bottom-left",
	bottomCenter = "bottom-center",
	bottomRight = "bottom-right",
}

type ToastProps = {
	onClose: () => void;
	message: string;
	variant?: ToastType;
	progressBar?: boolean;
	closeButton?: boolean;
	location?: ToastLocation;
}