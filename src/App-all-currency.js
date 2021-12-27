import { useState, useEffect } from "react";
import { Container, Typography, Grid, TextField, MenuItem, Button, } from "@mui/material"
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
const theme = createTheme();

function App() {
  const [amount, setAmount] = useState();
  const [selectedCurrency1, setSelectedCurrency1] = useState();
  const [selectedCurrency2, setSelectedCurrency2] = useState();
  const [result, setResult] = useState("");
  const [curr, setCurr] = useState({
    fetchedCurrencies : [],
    error : null,
    fetchingDone : false
  });
  const [data, setData] = useState({
    fetchedCurrencies : [],
    error : null,
    fetchingDone : false
  });
  const fetchCurrencies = async () => {
    try {
    const connect = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=580bc4f076b0cee3db10de2ece11a4ac`);
    const jsondata = await connect.json();
    setCurr({
              ...data,
            fetchedCurrencies : jsondata,
              fetchingDone : true
            });
    } catch (e) {
      setCurr({
                ...data,
                error : `Palvelimeen ei saatu yhteyttä`,
                fetchingDone : true
              });
    }
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchData = async () => {
    try {
    const connect = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=580bc4f076b0cee3db10de2ece11a4ac&base=${selectedCurrency1}`);
    const jsondata = await connect.json();
    setData({
              ...data,
              fetchedCurrencies : jsondata,
              fetchingDone : true
            });
    } catch (e) {
      setData({
                ...data,
                error : `Palvelimeen ei saatu yhteyttä`,
                fetchingDone : true
              });
    }
    calculateResult();
  }

  const getCurrencies = () => {
    let select = [];
    console.log(curr.fetchedCurrencies)
    for(const currency in curr.fetchedCurrencies.rates){
      select.push(<MenuItem value={`${currency}`}>{`${currency}`}</MenuItem>)
    }
    return select
  }

  const calculateResult = () => {
    let x = 0;
    for(const currency in data.fetchedCurrencies.rates){
      if(currency === selectedCurrency2){
        x = data.fetchedCurrencies.rates[currency]
      }
    }
    let calculate = x * amount;
    calculate = calculate.toFixed(2);
    setResult(`Muunnoksen tulos: ${amount} ${selectedCurrency1} = ${calculate} ${selectedCurrency2}`);
  }

  return (
    <ThemeProvider theme={theme}>
    <Container fixed>
      <Typography variant="h5">Valuuttamuunnin</Typography>
      <Grid container>
        <Grid item>
          <TextField type="number" label="Muunnettava määrä" onChange={(e) => {setAmount(e.target.value)}}/>
        </Grid>
        {(!curr.fetchingDone)
        ? <Typography>Tietoja haetaan, odota hetki...</Typography>
        : (!curr.error)
          ? <>
              <Grid item>
                <TextField
                  label="Valitse muunnettava valuutta"
                  select
                  value={selectedCurrency1} 
                  onChange={(e) => {setSelectedCurrency1(e.target.value);}}>
                  {getCurrencies()}
                </TextField>
              </Grid> 
              <Grid item>
                <TextField
                  label="Valitse valuuttakurssi"
                  select
                  value={selectedCurrency2} 
                  onChange={(e) => {setSelectedCurrency2(e.target.value);}}>
                  {getCurrencies()}
                </TextField>
              </Grid>
            </>
          : <Typography>{data.error}</Typography>
        }
        <Grid item>
          <Button variant="contained" color="secondary" onClick={()=>{fetchData()}}>
            Laske valuuttamuunnos
          </Button>
        </Grid>
        <Grid item>
          {(!result)
          ? null
          : <Typography>{result}</Typography>
          }
        </Grid>
      </Grid>
    </Container>
    </ThemeProvider>
  );
}
export default App;
