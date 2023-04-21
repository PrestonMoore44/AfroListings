import React, { useEffect, useState, FC, ReactNode } from "react";
import Profile from "../../components/profile/profile";
import Layout from "../../components/layout/layout";
import Home from "../../components/profile/home";

interface LayoutProps {
	children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	useEffect(() => {
		console.log(" Wonderful world... ")
	}, [])
	return <div className="">{children}</div>;
	}
};

export default Layout;
