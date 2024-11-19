function checkActive(path, pathname, active, notactive) {
	if(pathname === path) 
		return active;
	
	return notactive;
}

export {
	checkActive
}