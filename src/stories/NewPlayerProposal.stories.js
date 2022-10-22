import { html } from 'lit-html';

import '../player';

export default {
	title: 'Working',
};

const Template = ({
	mediaId = '',
	widgetId = ''
}) => {
	return html`
		<style>
			#video-wrapper {
				width: 50%;
				aspectratio: 16/9;
				margin-left: 25%;
			}
		</style>
		<div id='video-wrapper'>
			<new-player-proposal
				mediaId='${mediaId}'
				id='${widgetId}'
			></new-player-proposal>
		</div>
	`;
};

export const WebComponent = Template.bind({});
WebComponent.args = {
	mediaId: '1_gp572bda',
	widgetId: 'my-media-widget'
};
