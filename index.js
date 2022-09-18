const express = require("express");
const cors = require("cors");
const path = require('path');
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const { executenode } = require("./executenode");


const { generateFile } = require("./generateFile");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname + '/code_league/main.html'));
})

app.use(express.static(path.join(__dirname, 'code_league')));

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  console.log(language, "Length:", code.length);

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  const filepath = await generateFile(language, code);

  let result = {output: "Output"}

  if (language == "cpp"){
    let prom = executeCpp(filepath).catch((e)=>{return res.status(400).json({error: e})})
    result.output = await prom;
  }
  
  if (language == "py"){
    let prom = executePy(filepath).catch((e)=>{return res.status(400).json({error: e})})
    result.output = await prom;
  }

  if (language == "js"){
    let prom = executenode(filepath).catch((e)=>{return res.status(400).json({error: e})})
    result.output = await prom;
  }



  return res.status(201).json(result);
});

app.listen(5000, () => {
  console.log(`Listening on port 5000!`);
});