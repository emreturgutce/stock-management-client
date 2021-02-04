import Helmet from 'react-helmet';

const Page = ({ title, children }) => {
	return (
		<>
			<Helmet>
				<title>{title} - Stok Yönetim Sistemi</title>
			</Helmet>
			{children}
		</>
	);
};

export default Page;
