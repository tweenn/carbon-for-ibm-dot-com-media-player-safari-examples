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
					<link
						rel='stylesheet'
						href='https://1.www.s81c.com/common/v18/drupal/css/www.css'
						media='all'
					/>
					<style>
						#video-wrapper {
							width: 50%;
							aspectratio: 16/9;
							margin-left: 25%;
						}
					</style>
					<script>
						window.digitalData = {
							page: {
								pageInfo: {
									language: 'en-US',
									ibm: {
										country: 'US',
										siteID: 'IBMTESTWWW'
									}
								},
								isDataLayerReady: true
							}
						};
					</script>
					<script src='https://1.www.s81c.com/common/v18/drupal/js/www.js'></script>
					<script src='https://1.www.s81c.com/common/stats/ibm-common.js'></script>
				</head>
				<body id='ibm-com' class='ibm-type'>
					<div id='ibm-content-wrapper'>
						<div
							id='video-wrapper'
							data-widget='videoplayer'
							data-videoid='${mediaId}'
							data-videotype='kaltura'
						>
							<a href='https://mediacenter.ibm.com/media/${mediaId}'>Watch the video</a>
						</div>
					</div>
				</body>
		"></iframe>
	`;
};

export const Northstar = Template.bind({});
Northstar.args = {
	mediaId: '1_gp572bda'
}
