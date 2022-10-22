import { html } from 'lit-html';

export default {
	title: 'Failing',
};

const Template = ({
	mediaId = ''
}) => {
	return html`
		<iframe style='width: 90vw; height: 90vh; border: 0;'
			sandbox='allow-scripts allow-same-origin'
			srcdoc="
				<head>
					<style>
						#video-wrapper {
							width: 50%;
							aspectratio: 16/9;
							margin-left: 25%;
						}
					</style>
					<script type='module'>
						import 'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/video-player.min.js';

						window.digitalData = {
							page: {
								pageInfo: {
									language: 'en-US',
									ibm: {
										country: 'US',
										siteID: 'IBMTESTWWW',
									},
								},
								isDataLayerReady: true,
							},
						};
					</script>
				</head>
				<body>
					<div id='video-wrapper'>
						<dds-video-player-container id='my-video' video-id='${mediaId}'></dds-video-player-container>
					</div>
				</body>
		"></iframe>
	`;
};

export const Carbon = Template.bind({});
Carbon.args = {
	mediaId: '1_gp572bda'
}
