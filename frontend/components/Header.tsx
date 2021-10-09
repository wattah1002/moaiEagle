import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Link from "next/link";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image'
import MainIcon from '../public/icon_x.png';

export default function Home(data) {
  return (
    <div>
        {/* <Box sx={{ flexGrow: 1 }}> */}
        <AppBar position="static" color="inherit">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/">
                <Image
                  // layout="fill"
                  // objectFit={"cover"}
                  width={90}
                  height={60}
                  src={MainIcon}
                  alt="MainIcon"
                />
              </Link>
            </Typography>
            <Button color="inherit">
              <Link href="/selectschool">
                {data.name}
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      {/* </Box> */}
    </div>
  )
}
