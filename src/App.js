
import css from "./App.css"
import Bar from "./Bar"
import Conventer from "./Conventer"
import Footer from "./Footer"
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: "#5BC8B8",
      contrastText: '#fff',
    },
    yellow: {
      main: "#FFC478",
      contrastText: '#fff',
    },
    seondary: {
      main: "#BBDFC8",
    },
  },
});
function App() {

  return (
    <ThemeProvider theme={theme}>
      <Bar/>
      <Conventer/>
      <Footer/>
    </ThemeProvider>
  );
}
export default App;
