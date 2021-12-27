import { useState, useEffect } from "react";
import { Container, Typography, Grid, TextField, MenuItem, Button, } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    greenBox:{
        backgroundColor: "#75CFB8",
        borderRadius: "15px",
    },
    whiteText:{
        color: "#fff"
    }
}));

function Conventer() {
    const classes = useStyles();
    const [amount, setAmount] = useState();
    const [selectedCurrency, setSelectedCurrency] = useState();
    const [result, setResult] = useState("");
    const [data, setData] = useState({
    fetchedCurrencies : [],
    error : null,
    fetchingDone : false
    });
    const fetchData = async () => {
    try {
    const connect = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=580bc4f076b0cee3db10de2ece11a4ac`);
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
    }

    useEffect(() => {
        fetchData();
    }, []);

    const getCurrencies = () => {
    let select = [];
    for(const currency in data.fetchedCurrencies.rates){
        select.push(<MenuItem key={`${currency}`} value={`${currency}`}>{`${currency} (${data.fetchedCurrencies.rates[currency].toFixed(2)})`}</MenuItem>)
    }
    return select
    }

    const calculateResult = () => {
    let x = 0;
    for(const currency in data.fetchedCurrencies.rates){
        if(currency === selectedCurrency){
        x = data.fetchedCurrencies.rates[currency]
        }
    }
    let calculate = x * amount;
    calculate = calculate.toFixed(2);
    setResult(`${amount} EUR = ${calculate} ${selectedCurrency}`);
    }

    return (
    <Container maxWidth={'sm'} sx={{ mb: 6, mt: 16 }}>
        <Grid container>
        <Grid item xs={12}>
            <TextField fullWidth type="number" label="Muunnettava määrä" 
            InputProps={{startAdornment: (<InputAdornment position="start">€</InputAdornment>),}}
            onChange={(e) => {setAmount(e.target.value)}} 
            sx={{ mt: 3 }}/>
        </Grid>
        {(!data.fetchingDone)
        ? <Typography>Tietoja haetaan, odota hetki...</Typography>
        : (!data.error)
            ? <Grid item xs={12}>
                <TextField
                fullWidth
                label="Valuuttakurssi"
                helperText="Valitse valuuttakurssi"
                select
                value={selectedCurrency} 
                onChange={(e) => {setSelectedCurrency(e.target.value);}}
                sx={{ mt: 3 }}>
                {getCurrencies()}
                </TextField>
            </Grid>
            : <Typography>{data.error}</Typography>
        }
        <Grid item xs={12}>
            <Button fullWidth variant="contained" color="yellow" className="shadow"
            onClick={()=>{calculateResult()}} sx={{ mt: 3 }}>
            Laske valuuttamuunnos
            </Button>
        </Grid>
        {(!result)
        ? null
        : <Grid item xs={12} className={["shadow",classes.greenBox]} sx={{ mt: 6, p: 6 }}>
            <Typography variant="button" className={classes.whiteText}>Muunnoksen tulos:</Typography>
            <Typography className={classes.whiteText}>{result}</Typography>
        </Grid>
        }
        </Grid>
    </Container>
    );
}
export default Conventer;
