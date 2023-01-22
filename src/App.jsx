import { useState } from 'react'
import { Button , TextField , Box , ThemeProvider , createTheme , CssBaseline } from '@mui/material'
import { Configuration , OpenAIApi } from 'openai'
import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily : ['Josefin Sans' , 'sans-serif'].join(','),
  }
});

function App() 
{
  const [prompt , setPrompt] = useState('');
  const [result , setResult] = useState('');
  const [loading , setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async() => {
    try {
      setLoading(true);
      setResult('');
      const response = await openai.createImage({
        prompt: prompt,
        size: "512x512",
        n: 1,
      });
      setResult(response.data.data[0].url);
      setLoading(false);
    }
    catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      setLoading(false);
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App"> 
        <h2>VITE x Open AI DALL·E</h2>
        <Box mb={2}>
          <TextField sx={{width: '500px'}} rows={5} placeholder="Type Something to Generate an Image" multiline onChange={(e)=>setPrompt(e.target.value)}/>
        </Box>

        <Button variant="outlined" disabled={loading} onClick={generateImage}>
          {loading ? 'Loading...' : 'Generate Image'}
        </Button>

        {result.length ? <Box mt={2} component="img" src={result} alt="" sx={{ height: "auto", width: "auto" }} /> : ''}
      </div>
    </ThemeProvider>
  )
}

export default App
