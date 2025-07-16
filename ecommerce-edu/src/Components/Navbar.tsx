import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import "../Style/Navbar.css";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  return (
    <AppBar position="static" className="header-bar">
      <Toolbar className="toolbar">
        <img src={logo} alt="Logo" className="logo" />

        <Box className="nav-links" sx={{ display: { xs: "none", md: "flex" } }}>
          <Button className="nav-button">Giáo viên</Button>
          <Button className="nav-button">Cộng đồng</Button>
          <Button className="nav-button">Đánh giá của học viên</Button>
          <Button className="nav-button">Về chúng tôi</Button>
          <NavLink
            to="/books-courses"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <Button className="nav-button">Sách & Khóa học</Button>
          </NavLink>
        </Box>

        <Box className="action-group">
          <Button variant="contained" color="warning" className="trial-button">
            Học thử MIỄN PHÍ ngay
          </Button>

          <Button className="login-button">Đăng nhập</Button>

          <IconButton onClick={handleClick} className="language-button">
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>🇻🇳 Tiếng Việt</MenuItem>
            <MenuItem onClick={handleClose}>🇺🇸 English</MenuItem>
          </Menu>
        </Box>

        <IconButton
          edge="end"
          className="menu-icon"
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {[
              "Giáo viên",
              "Cộng đồng",
              "Đánh giá của học viên",
              "Về chúng tôi",
            ].map((text, index) => (
              <ListItemButton key={index} component="a" href="#">
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
