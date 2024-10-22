import {
<<<<<<< HEAD
  createTheme,
  ThemeProvider,
  CssBaseline,
  Stack,
  styled,
  Paper,
  Box,
} from '@mui/material';
import AppBarr from '../components/AppBar';
import { useMemo, useState } from 'react';
import getDesignTokens from './styles/MyTheme';
import MyList from '../components/List';
import Posts from '../components/Posts';
import RightBar from '../components/RightBar';

// Styled Paper component with themed background
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary.main
      : theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

function Home() {
  // Retrieve theme mode from localStorage or default to "dark"
  const [mode, setmyMOde] = useState(() => {
    const savedMode = localStorage.getItem('currentMode');
    return savedMode ? savedMode : 'dark';
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const [showList, setshowList] = useState('none');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={theme.palette.mode}>
        <AppBarr showList={showList} setshowList={setshowList} />

        <Stack sx={{ flexDirection: 'row' }}>
          <MyList
            setmyMOde={setmyMOde}
            theme={theme}
            showList={showList}
            setshowList={setshowList}
          />
          <Posts />
          <RightBar theme={theme} />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
=======
    createTheme,
    ThemeProvider,
    CssBaseline,
    Stack,
    styled,
    Paper,
    Box,
  } from "@mui/material";
  import AppBarr from "../components/AppBar";
  import { useMemo, useState } from "react";
  import getDesignTokens from "./styles/MyTheme";
  import MyList from "../components/List";
  import PostsDisplay from "./PostsDisplay";
  import RightBar from "../components/RightBar";
import AddPost from "../components/AddPost"
  // Styled Paper component with themed background
 styled(Paper)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  }));
  
  function Home() {
    // Retrieve theme mode from localStorage or default to "dark"
    const [mode, setmyMOde] = useState(() => {
      const savedMode = localStorage.getItem("currentMode");
      return savedMode ? savedMode : "dark";
    });
  
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    const [showList, setshowList] = useState("none");
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className={theme.palette.mode}>
          <AppBarr showList={showList} setshowList={setshowList} />
  
          <Stack sx={{ flexDirection: "row" }}>
            <MyList
              setmyMOde={setmyMOde}
              theme={theme}
              showList={showList}
              setshowList={setshowList}
            />
            <PostsDisplay />
            <RightBar theme={theme} />
          </Stack>
          
          <AddPost />

        </Box>
      </ThemeProvider>
    );
  }
  
  export default Home;
  
>>>>>>> 52eae0bd23041a456f732f2e366ca2ac9ed5cc12
