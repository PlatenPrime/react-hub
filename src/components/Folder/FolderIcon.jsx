// FolderIcon.jsx
import React from 'react';

const FolderIcon = ({ color, size, text }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill={color}
			width={size}
			height={size}
		>

			<path d="M21 6H11l-2-2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM3 20V8h18v12H3z" />
		
		</svg>
	);
};

export default FolderIcon;
