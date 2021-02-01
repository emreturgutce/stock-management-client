import Helmet from 'react-helmet';
import React from 'react';

const Profile = () => {
	return (
		<>
			<Helmet>
				<title>Profil - Stok Yönetim Sistemi</title>
			</Helmet>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '80%',
					margin: '60px auto',
				}}
			>
				<div
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					Profil
				</div>
			</div>
		</>
	);
};

export default Profile;
