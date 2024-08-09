const { registerBlockType } = wp.blocks;
const { Button, TextControl, ToggleControl, PanelBody } = wp.components;
const { useState } = wp.element;
const {
	__experimentalLinkControl: LinkControl,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} = wp.blockEditor;
const { __ } = wp.i18n;

import './style.scss';
import './editor.scss';
import metadata from './block.json';

const Edit = ( { attributes, setAttributes } ) => {
	const { links } = attributes;

	// Temporary state for new record input
	const [ newIcon, setNewIcon ] = useState( '' );
	const [ newTitle, setNewTitle ] = useState( '' );
	const [ newDescription, setNewDescription ] = useState( '' );
	const [ newUrl, setNewUrl ] = useState( '' );

	const addNewRecord = () => {
		const newRecord = {
			icon: newIcon,
			title: newTitle,
			description: newDescription,
			url: newUrl,
		};
		setAttributes( { links: [ ...links, newRecord ] } );

		// Clear input fields after adding
		setNewIcon( '' );
		setNewTitle( '' );
		setNewDescription( '' );
		setNewUrl( '' );
	};

	const removeRecord = ( index ) => {
		const newlinks = links.filter( ( link, idx ) => idx !== index );
		setAttributes( { links: newlinks } );
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title="Block Settings">
					<ToggleControl
						label={ __(
							'Alternate icon position',
							'qb-link-list'
						) }
						checked={ attributes.alternateStyle }
						onChange={ () =>
							setAttributes( {
								alternateStyle: ! attributes.alternateStyle,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="link-list-post-selector-block wp-block">
				<div className="link-list-post-selector-block-new">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( image ) =>
								setNewIcon( image.sizes.full.url )
							}
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									className={
										newIcon
											? 'image-button'
											: 'button button-large'
									}
								>
									{ newIcon ? (
										<img src={ newIcon } alt="Icon" />
									) : (
										'Choose Icon'
									) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					<div className="link-list-post-selector-block-new-text">
						<TextControl
							label={ __( 'Title', 'qb-link-list' ) }
							value={ newTitle }
							onChange={ ( value ) => setNewTitle( value ) }
						/>
						<TextControl
							label={ __( 'Description', 'qb-link-list' ) }
							value={ newDescription }
							onChange={ ( value ) => setNewDescription( value ) }
						/>
						<div className="components-base-control">
							<p className="link-list-label">Link</p>
							<LinkControl
								searchInputPlaceholder={ __(
									'Search for a post, or enter a url…',
									'qb-link-list'
								) }
								value={ newUrl }
								settings={ [] }
								onChange={ ( value ) => setNewUrl( value ) }
							></LinkControl>
						</div>
					</div>
				</div>
				<Button
					className="link-list-button"
					isPrimary
					onClick={ addNewRecord }
					disabled={
						! newUrl || ! newTitle || ! newIcon || ! newDescription
					}
				>
					Add New Link
				</Button>
				{ links.length > 0 && (
					<div className="link-list-post-selector-block-list wp-block">
						<h3>Added Links</h3>
						<div
							className={ `link-list-post-selector-block-list-container ${
								attributes.alternateStyle
									? 'link-list-post-selector-block-list-container-alt'
									: ''
							}` }
						>
							{ links.map( ( record, index ) => (
								<div key={ index }>
									{ record.icon ? (
										<img
											src={ record.icon }
											alt={ record.title }
										/>
									) : (
										<p>No icon</p>
									) }
									<div>
										<h4>{ record.title }</h4>
										<p>{ record.description }</p>
										<p>{ record.url.url }</p>
									</div>

									<Button
										className="link-list-button"
										onClick={ () => removeRecord( index ) }
										isDestructive
									>
										x
									</Button>
								</div>
							) ) }
						</div>
					</div>
				) }
			</div>
		</div>
	);
};

registerBlockType( metadata.name, {
	edit: Edit,
	save( { attributes } ) {
		const { links } = attributes;
		return (
			<section className="link-list-post-list">
				{ links.map( ( record, index ) => (
					<div
						className={ `link-list-post-container ${
							attributes.alternateStyle
								? 'link-list-post-container-alt'
								: ''
						}` }
						key={ index }
					>
						<a href={ record.url }>
							{ record.icon ? (
								<img src={ record.icon } alt={ record.title } />
							) : (
								<div></div>
							) }
							<div>
								<h3>{ record.title }</h3>
								<p>{ record.description }</p>
							</div>
						</a>
					</div>
				) ) }
			</section>
		);
	},
} );
