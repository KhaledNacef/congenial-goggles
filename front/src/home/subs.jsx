import { Button, TextField } from '@mui/material';
import React,{useState} from 'react'
import axios from 'axios';
const Subs = () => {
    const [amount, setAmount] = useState(0);


    const pay=async()=>{
            try{
                await axios.post("http://localhost:3000/subscription/pay",{amount:amount}).then((res)=>{
                    const {result}=res.data
                    window.location.href=result.link
                })
            }catch(err){console.log(err)}

    }

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>

        
     <TextField
                        label="Amount"
                        variant="outlined"
                        type="number"
                        name="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                        margin="normal"
                        sx={{
                            width: 500
                            
                        }}
                    />

                    <Button onClick={pay}> PAY </Button>
    
    </div>
  )
}

export default Subs