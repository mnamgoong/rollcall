import React from 'react';
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { AccountCircle, Notifications } from "@mui/icons-material";

const Header = () => {
	return (
		<AppBar
			position="fixed"
			color="primary"
			sx={{
				width: "80vw", 
				left: "20vw" 
			}}
		>
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					Hi, Mr. Peabody!
				</Typography>
				<IconButton color="inherit">
					{/* <Badge badgeContent={1} color="error">
						<Notifications />
					</Badge> */}
					<Badge>
						<Notifications />
					</Badge>
				</IconButton>
				<IconButton color="inherit">
					<AccountCircle />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
