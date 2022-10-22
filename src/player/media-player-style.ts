import {
	css
} from 'lit';

export default css`
	.hide {
		display: none !important;
	}

	.media-player--poster {
		position: relative;

		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
	}

	.media-player--poster span {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.25rem 0;
		font-size: 0.825rem;
		color: #fff;
		background-color: #000;
	}

	::slotted(*) {
		width: 100%;
		aspect-ratio: 16/9;
	}
`;
