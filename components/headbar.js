import React, { useContext } from 'react'
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
import { Dropdown } from 'react-bootstrap';




const useStyles = makeStyles((theme) => ({
  
  drawButt:{
    width:60+"vw",
    padding:2+"vh",
    borderStyle:"solid",
    borderWidth:0,
    borderTopWidth:1+"px",
    borderColor:"grey",
    
  },
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
    boxShadow:0+"px",
		height:12+"vw",
  	elevation: 0,
    width:100+"vw" ,
		backgroundColor: CLR_HEAD,
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      width: '80%'
    }
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color:"white",
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
  },

  createbtn: {
    backgroundColor:"white",
    width: 10+"vw" ,
    height: 50+"%" ,
    margin:1+"vw", 
    fontWeight:"bold",
    fontSize: 50+"%"

  },
  menuback:{
    //backgroundColor:"purple",
    width:7+"vw",
    height:7+"vw",
    //borderRadius:5+"vw"
  }

}));

const headerimg = "https://upload.wikimedia.org/wikipedia/commons/2/28/Red_rose.jp"

export default function ButtonAppBar(props) {
  const classes = useStyles();
	const [drawerState,setDrawerState] = React.useState(false);
  const router = useRouter()
  
  const authContext = useContext(AuthContext);

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

					<Drawer anchor={"left"} open={drawerState} onClose={()=>console.log("closed")} variant='temporary'>
             <Drawercomponent />
				          </Drawer>
          </IconButton>
          <Button onClick={()=>router.push("/home")}>
					{/*<img src={headerimg} className={classes.logo} />*/}

          <Typography variant="h6" className={classes.title}>
            {props.itemName }
          </Typography>
          </Button>
             {
               authContext.accounttype?
             <Button  className={classes.createbtn} onClick={()=>{router.push("/newTask")}}>create Task</Button>
            :
            <Button  className={classes.createbtn} onClick={()=>{router.push("/newService")}}>create Service</Button>
            }
            <Button  className={classes.createbtn} onClick={()=>{router.push("/")}}>Post Item</Button>
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
    <div style={{padding:10+"px"}}>

       
     <div style={{width:60+"vw", display:"flex", flex:1 , flexDirection:"row-reverse" }} >
      {!authContext.accounttype?<div style={{fontSize:6+"vw"}}>   work    </div>:<div style={{fontSize:6+"vw"}}>   user   </div>}<Switch  checked={ authContext.accounttype} onChange={()=>{authContext.changeaccount() ;router.push("/home")}}></Switch>
      <div className={classes.title} style={ { fontSize:8+"vw",paddingBottom:10}}>Freebees</div>
      </div>

<div className={classes.drawButt}>
      {authContext.isLoggedIn ?
      <>
      <span style={{paddingRight:50 }} onClick={()=>{router.push("/profile")}}>{user.name}</span> 
      <span  onClick={()=>{ localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token") ;authContext.logout() }} >{"logout"}</span>
      </>:
<>
     <span style={{paddingRight:50 }} onClick={()=>{router.push("/profile")}}>{user.name}</span> 
      <span  onClick={()=>{router.push("/profile") }} >{"logout"}</span>
</>
}
    </div>


    <div className={classes.drawButt}>
    <div  onClick={()=>{router.push("/orders")}}>{"orders"}</div>
    </div>

    <div className={classes.drawButt}>
    <div  onClick={()=>{router.push("/settings")}}>{"settings"}</div>
    </div>
     <Catdrop />
    </div>
  );

}


function Catdrop(props){
  const classes = useStyles();
  return(
    <>
      <div className={classes.drawButt} ><span >Plumber</span> 
        
      </div>
    </>
  );
}