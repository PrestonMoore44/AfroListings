const PageNotFound = () => {
	return (
		<div className="background_404">
			<div
				style={{
					textAlign: "left",
					width: "fit-content",
					margin: "0 auto",
				}}
			>
				<div
					style={{ fontSize: 130, fontWeight: 700, letterSpacing: 2 }}
				>
					404
				</div>
				<div
					style={{ fontSize: 18, fontWeight: 400, letterSpacing: 1 }}
				>
					<div>Looks like you may be lost in Cyber Space.</div>
					<button className="btn btn_404">
						Learn more about Afro Listings services
					</button>
					<div style={{ fontWeight: 500 }}>
						<a href="/">No thanks, just take me home</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
