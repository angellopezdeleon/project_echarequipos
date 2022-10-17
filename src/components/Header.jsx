import React from 'react'

const h1Style = {
	margin: '50px',
	padding: '20px',
	display: 'flex',
	justifyContent: 'center',
	color: 'white'
};

const divStyle = {
	backgroundColor: '#0d47a1'
};

export default function Header() {
  return (
	<div style={divStyle}>
		<h2 style={h1Style}>
			Echar <br /> 
			Equipos
		</h2>
	</div>
  )
}
