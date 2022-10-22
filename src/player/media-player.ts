import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { KalturaPlayer as KalturaPlayerAPI } from '@carbon/ibmdotcom-services';

import mediaPlayerStyle from './media-player-style';

@customElement('new-player-proposal')
export class NewPlayerProposal extends LitElement {

	@property()
	mediaId = '';

	@state()
	isPlayerReady = false;

	@state()
	wasClicked = false;

	@state()
	mediaInformation = {
		duration: 0,
		name: ''
	};

	@state()
	mediaTitle = '';

	@state()
	mediaDuration = 0;
	
	@state()
	thumbnailUrl: string = '';

	@state()
	playerSize = {
		width: 0,
		height: 0
		}
	
	@state()
	kdp: any = {};
	
	static styles = mediaPlayerStyle;

	private holderId = 'default-player-id';
	private playerId = '--media-player';

	async initPlayer() {
		this.standarizePlayer();
		this.getElementSize();
		this.createChildPlayerElement();
		await this.renderMediaPoster();
		await this.embedMedia();
	}

	standarizePlayer () {
		if (this.getAttribute('id') === null) {
			this.setAttribute('id', this.holderId);
		}

		this.holderId = this.getAttribute('id') || this.holderId;

		this.playerId = this.holderId + this.playerId;
	}

	createChildPlayerElement () {
		const elementMediaPlayer = document.createElement('div');
		elementMediaPlayer.id = this.playerId;

		this.appendChild(elementMediaPlayer);
	}

	getElementSize() {
		const elem = this.shadowRoot.querySelector('.media-player');
		const width = parseInt(getComputedStyle(elem).getPropertyValue('width'));
		const height = Math.floor((width / 16) * 9);

		this.playerSize = {
			width,
			height
		}
	}

	async renderMediaPoster() {
		this.mediaInformation = await KalturaPlayerAPI.api(this.mediaId);
		this.mediaTitle = this.mediaInformation.name;
		this.mediaDuration = KalturaPlayerAPI.getMediaDuration(this.mediaInformation.duration);
		this.thumbnailUrl = KalturaPlayerAPI.getThumbnailUrl({
			mediaId: this.mediaId,
			width: this.playerSize.width,
			height: this.playerSize.height
		});
	}

	async embedMedia() {
		const context = this;

		await KalturaPlayerAPI.embedMedia(
			this.mediaId,
			this.playerId,
			{
				autoPlay: false
			},
			false,
			(kdp: any) => {
				context.isPlayerReady = true;
				context.kdp = kdp;
			}
		);

		this.isPlayerReady = true;
	}

	clickWrapper() {
		this.wasClicked = true;
		this.kdp.sendNotification('doPlay');
	}

	firstUpdated() {
		this.initPlayer();
	}

	render() {
		return html`
			<div class='media-player'>
				<button
					class='media-player--poster ${this.wasClicked ? 'hide' : 'show'}'
					@click='${this.clickWrapper}'
				>
					<img
						src='${this.thumbnailUrl}'
						width='${this.playerSize.width}'
						height='${this.playerSize.height}'
					/>
					<span>
						${this.mediaTitle} - ${this.mediaDuration}
					</span>
				</button>
			</div>
			<slot class='${this.wasClicked ? 'show' : 'hide'}' />
		`;
	}
}
