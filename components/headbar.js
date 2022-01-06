import React from 'react'
import { latestworkobj, ongoingwork, Shopname, user } from '../constants'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { fade, makeStyles  } from '@material-ui/core/styles';
import {Switch, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import Modal from '@material-ui/core/Modal';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import {CLR_HEAD} from '../themes.js'

import Link from 'next/link'
import { useRouter } from 'next/router';
import { AuthContext } from '../context';




const useStyles = makeStyles((theme) => ({
  
	paper: {
     marginRight: theme.spacing(2),
   },
logo:{
	height:50+"%",
	width:10+"%",

},
  root: {
    width:100+"%",
    flexGrow: 1 ,
	elevation: 0,

  },

  
	appbar:{ 
		height:10+"vh",
  	elevation: 0,
    width:100+"vw" ,
		backgroundColor: CLR_HEAD
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    
    width:100+"%"
  },
	search: {
	 position: 'relative',
	 borderRadius: theme.shape.borderRadius,
	 backgroundColor: fade(theme.palette.common.white, 0.15),
	 '&:hover': {
		 backgroundColor: fade(theme.palette.common.white, 0.25),
	 },
	 marginLeft: 0,
	 width: '100%' ,
	 [theme.breakpoints.up('sm')]: {
		 marginLeft: theme.spacing(1),
		 width: 'auto',
	 },
 },
	searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center' ,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: { 
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]:{
      width: '12ch' ,
      '&:focus': {
        width: '20ch',
      },
    },
  },
  drawer :{
    minWidth: 35+"vw"
  }

}));

const headerimg = "https://upload.wikimedia.org/wikipedia/commons/2/28/Red_rose.jp"

export default function ButtonAppBar(props) {
  const classes = useStyles();
	const [drawerState,setDrawerState] = React.useState(false);
  const router = useRouter()
  


  const toogleDstate = () => {
      setDrawerState(!drawerState); 
	}

  

  console.log(user);
  console.log(ongoingwork);
  console.log(latestworkobj);

  
 
return (
   
      <AppBar position="sticky" classes={{root:classes.appbar}}>
        <Toolbar style={{height:10+"%"}}>
          <IconButton edge="start"  color="inherit" aria-label="menu" onClick={()=>toogleDstate()} >

            <MenuIcon />

					<Drawer anchor={"left"} open={drawerState} onClose={()=>console.log("closed")} variant='persistent'>
             <Drawercomponent />
				          </Drawer>
          </IconButton>
          <Button onClick={()=>router.push("/home")}>
					<img src={headerimg} className={classes.logo} />

          <Typography variant="h6" className={classes.title}>
            {props.itemName }
          </Typography>
          </Button>
            <Button  style={{backgroundColor:"white"}} onClick={()=>{router.push("/newTask")}}>create Task</Button>
            <Button  style={{backgroundColor:"white"}} onClick={()=>{router.push("/newService")}}>create Service</Button>
          {true?
            <div></div>:
            <div className={classes.search}>
					 <div className={classes.searchIcon}>
						 <SearchIcon />
					 </div>
					 <InputBase
						 placeholder="Search…"
						 classes={{
							 root: classes.inputRoot,
							 input: classes.inputInput,
						 }}
						 inputProps={{ 'aria-label': 'search' }}
					 />
				 </div>
          }
					

        </Toolbar>
      </AppBar>
    
  );

  
}




{ /* const handleClose = () => {
    setOpen(false);
  };  */}

function MenuListTeachers() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };


  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>

      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Toggle Menu Grow
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>


                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}


function MenuListStudents() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

	const handleOpen = () => {
	    setOpen(true);
	  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>

      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Toggle Menu Grow
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

function MenuListParents() {

	const [openm, setOpenm] = React.useState(false);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
	const handleOpen = () => {
	    setOpen(true);
	  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>

      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Parents
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>



                    <MenuItem onClick={handleClose}><div><Link href="/student/registerpage"><a>this page!</a></Link></div></MenuItem>
                    <MenuItem onClick={handleClose}>Who we Are</MenuItem>


                  </MenuList>
                </ClickAwayListener>

              </Paper>
            </Grow>
          )}
        </Popper>

      </div>
    </div>
  );
}

function Drawercomponent(props){

  const classes = useStyles();
  const router = useRouter();
  

const authContext = React.useContext(AuthContext);

  return (
    <div>
      {user.acctype?<span>work</span>:<span>user</span>}<Switch checked={user.acctype} onChange={()=>{user.acctype = !user.acctype;router.push("/home")}}></Switch>
<div>
    <div  onClick={()=>{router.push("/profile")}}>{user.name}</div>
    </div>

    <div>
    <div  onClick={()=>{router.push("/address")}}>{"addresses"}</div>
    </div>

    <div>
    <div  onClick={()=>{router.push("/info")}}>{"info"}</div>
    </div>

    <div>
    <div  onClick={()=>{router.push("/orders")}}>{"orders"}</div>
    </div>


    <div>
    <div  onClick={()=>{ localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token") ;authContext.logout() }} >{"logout"}</div>
    </div>
    </div>
  );

}
