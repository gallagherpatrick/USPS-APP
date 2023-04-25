import express from 'express';
import pkg from 'body-parser';
const bodyParser = pkg;
const app = express();
const port = 5173;
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonParser = bodyParser.json();

const parser = new XMLParser();
const builder = new XMLBuilder();

app.post('/test', jsonParser, async(req, res, next) =>{
  let data = await req.body.data;
  console.log("Line 22 " + JSON.stringify(data));
  let xml = `<Package ID="0">
            <Service>PRIORITY</Service>
            <ZipOrigination>22201</ZipOrigination>
            <ZipDestination>${data.zip}</ZipDestination>
            <Pounds>${data.pounds}</Pounds>
            <Ounces>${data.ounces}</Ounces>
            <Container></Container>
            <Width>${data.width}</Width>
            <Length>${data.length}</Length>
            <Height>${data.height}</Height>
            <Girth></Girth>
            <Machinable>TRUE</Machinable>
            </Package>`;
  console.log(xml);
  const request = await axios.get(`https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=<RateV4Request USERID="7D77GKSOF0633"><Revision>2</Revision>${xml}</RateV4Request>`);
  let json = await parser.parse(request.data);
  let xmlData  = await builder.build(json.RateV4Response);
  res.send(xmlData);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});
app.get('/src', (req, res) =>{
  res.sendFile(path.join(__dirname, '/src/script.js'));
});
app.get('/src/output', (req, res) =>{
  res.sendFile(path.join(__dirname, '/dist/output.css'));
})
app.get('/src/lib', (req, res) =>{
  res.sendFile(path.join(__dirname, '/src/lib/AppEnablementConnector.js'));
});
app.get('/src/lib/api/Common', (req, res) =>{
  res.sendFile(path.join(__dirname, '/src/lib/api/Common.js'));
});
app.get('/src/lib/api/ExternalMasterdata', (req, res) =>{
  res.sendFile(path.join(__dirname, '/src/lib/api/ExternalMasterdata.js'));
});
app.get('/src/lib/api/Masterdata', (req, res) =>{
  res.sendFile(path.join(__dirname, '/src/lib/api/Masterdata.js'));
});
app.get('/src/lib/api/Pos', (req, res) =>{
  res.sendFile(path.join(__dirname, '/src/lib/api/Pos.js'));
});

// exports.app = functions.https.onRequest(app);

app.listen(port, () =>{
    console.log(`App is listening on port ${port}`);
});