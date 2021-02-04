import React from 'react';
import Page from '../components/page';

const Profile = () => {
	return (
		<Page title='Profil'>
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
		</Page>
	);
};

export default Profile;
