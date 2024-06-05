import './Scale.css'

function Scale({name, instance, heightInstance}) {

	return (
		<li className='scale-column'>
			<div className='item-front' style={{height: `${heightInstance.front}%`}}>
				<p className='text-scale'>{instance.front}</p>
			</div>
			<div className='item-back' style={{height: `${heightInstance.back}%`}}>
				<p className='text-scale'>{instance.back}</p>
			</div>
			<div className='item-db' style={{height: `${heightInstance.db}%`}}>
				<p className='text-scale'>{instance.db}</p>
			</div>
			<h2 className='title-column'>{name}</h2>
		</li>
	);
}

export default Scale;