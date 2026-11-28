// A web page cannot write to the photo album directly, so each platform needs its own route:
// - iOS: a download goes to the Files app, while the share sheet offers "Save Image" (Photos)
// - Android / desktop: a normal download (Android galleries index the Download folder)
// - In-app browsers without a usable route: the user long-presses the image to save it
export type SaveImageResult = 'done' | 'needs-long-press';

function isIOS() {
	// iPadOS reports itself as Macintosh, so also check for touch support
	return (
		/iPad|iPhone|iPod/.test(navigator.userAgent) ||
		(navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1)
	);
}

function isAndroidInAppBrowser() {
	return /Android/.test(navigator.userAgent) && /Line\/|FBAN|FBAV|Instagram/.test(navigator.userAgent);
}

// Synchronous on purpose: navigator.share must be called while the tap is still "active"
function dataUrlToFile(dataUrl: string, fileName: string) {
	const [header, base64Content] = dataUrl.split(',');
	const mimeType = header.match(/data:(.*?);/)?.[1] ?? 'image/png';
	const binaryContent = atob(base64Content);
	const bytes = Uint8Array.from(binaryContent, (character) => character.charCodeAt(0));
	return new File([bytes], fileName, { type: mimeType });
}

function downloadImage(dataUrl: string, fileName: string) {
	const link = document.createElement('a');
	link.href = dataUrl;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	link.remove();
}

export async function saveImage(dataUrl: string, fileName: string): Promise<SaveImageResult> {
	if (isIOS()) {
		const shareData = { files: [dataUrlToFile(dataUrl, fileName)] };
		if (!navigator.canShare?.(shareData)) {
			return 'needs-long-press';
		}
		try {
			await navigator.share(shareData);
			return 'done';
		} catch (error) {
			// AbortError means the user closed the share sheet
			return (error as Error).name === 'AbortError' ? 'done' : 'needs-long-press';
		}
	}

	if (isAndroidInAppBrowser()) {
		return 'needs-long-press';
	}

	downloadImage(dataUrl, fileName);
	return 'done';
}
